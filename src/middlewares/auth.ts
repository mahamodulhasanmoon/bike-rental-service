import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../errors/CustomError';
import { catchAsync } from '../utils/catchAsync';
import { User } from '../modules/user/user.model';
import { IUserRole } from '../modules/user/user.interface';
import { access_token } from '../config';

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      // checking if the token is missing
      if (!token) {
        throw new CustomError(
          httpStatus.UNAUTHORIZED,
          'You Must Logged in first',
        );
      }

      // checking if the given token is valid
      const decoded = jwt.verify(token, access_token as string) as JwtPayload;

      const { role, email } = decoded;

      // checking if the user is exist
      const user = await User.isUserExists(email);

      if (!user) {
        throw new CustomError(httpStatus.NOT_FOUND, 'This user is not found !');
      }
      // checking if the user is already deleted

      const isDeleted = user?.isDeleted;

      if (isDeleted) {
        throw new CustomError(httpStatus.FORBIDDEN, 'This user is deleted !');
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new CustomError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        );
      }

      req.user = decoded as JwtPayload;
      next();
    },
  );
};

export default auth;
