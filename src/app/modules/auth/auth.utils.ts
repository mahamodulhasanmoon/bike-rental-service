// generate token
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TGenerateToken } from './auth.interface';

export const generateToken = (
  jwtPayload: TGenerateToken,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

