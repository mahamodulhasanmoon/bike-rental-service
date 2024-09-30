import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import { generateToken, verifyToken } from './auth.utils';

// sign up user
const signupUser = async (payload: TUser) => {
  // check user have then throw error
  if (await User.isUserExistsByEmail(payload.email)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This email already exists another user',
    );
  }

  const result = await User.create(payload);

  return result;
};

// login user service
const loginUser = async (payload: TLoginUser) => {
  // console.log(payload)
  // check user are exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password not matched');
  }

  const jwtPayload = {
    email: user.email,
    id: user._id,
    role: user.role,
  };

  // generate token
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    data: user,
  };
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userEmail } = decoded;

  const user = await User.isUserExistsByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const jwtPayload = {
    email: user.email,
    id: user._id,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  signupUser,
  loginUser,
  refreshToken,
};
