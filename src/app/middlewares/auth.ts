import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/auth/auth.interface';

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;

    // if token not found then sent error
    if (!bearerToken) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }

    const token = bearerToken.split(' ')[1];

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;


    // find user
    const user = await User.isUserExistsByEmail(email);

    // checking if user not found then throw error
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    // checking role have in the existing role
    if (roles && !roles.includes(role)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }

    // add this in request
    req.user = decoded as JwtPayload;

    // call next function
    next();
  });
};

export default auth;
