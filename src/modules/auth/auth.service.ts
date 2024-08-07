import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { CustomError } from '../../errors/CustomError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILogin, TJwtPayload } from './auth.interface';
import { genarateToken } from '../../utils/genarateToken';
import {
  access_token,
  access_tokenExpiry,
  refresh_token,
  refresh_tokenExpiry,
} from '../../config';

export const createUserService = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

export const loginService = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  // Check User Exist Or not
  if (!user) {
    throw new CustomError(404, 'User not exists please create an account');
  }
  //   Check User Is Deleted Or not
  if (user.isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'Already Deleted User');
  }
  //   check Passsword Is Valid or Not

  const isPasswordValid = (user as any).comparePassword(payload.password);

  if (!isPasswordValid) {
    throw new CustomError(httpStatus.FORBIDDEN, 'Invalid UserID or Password');
  }
  const jwtPayload: TJwtPayload = {
    userId: (user as any)._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  //   now Need to make AccessToken and RefreshToken

  const accessToken = genarateToken(
    jwtPayload,
    access_token,
    access_tokenExpiry,
  );

  const refreshToken = genarateToken(
    jwtPayload,
    refresh_token,
    refresh_tokenExpiry,
  );
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...rest } = user.toObject();
  return {
    accessToken,
    refreshToken,
    rest,
  };
};

export const refreshTokenService = async (token: string) => {
  const decoded = jwt.verify(token, refresh_token) as JwtPayload;

  const { email } = decoded;
  const user = await User.isUserExists(email);

  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new CustomError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const jwtPayload: TJwtPayload = {
    userId: (user as any)._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const accessToken = genarateToken(
    jwtPayload,
    access_token,
    access_tokenExpiry,
  );

  return {accessToken,user};
};
