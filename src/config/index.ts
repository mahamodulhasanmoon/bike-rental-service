import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV;
export const baseUrl = process.env.BASE_URL;
export const port = process.env.PORT;
export const mongoUrl: string = process.env.mongoDB_URI || '';
export const corsOrigin = process.env.ORIGIN;
export const access_token: string = process.env.ACCESS_TOKEN || '';
export const refresh_token: string = process.env.REFRESH_TOKEN || '';
export const redisUrl = process.env.ORIGIN;
export const defaultPass = process.env.DEFAULT_PASS;
export const saltRound = process.env.SALT_ROUND;
export const access_tokenExpiry: string =
  process.env.ACCESS_TOKEN_EXPIRE || '1d';
export const refresh_tokenExpiry: string =
  process.env.REFRESH_TOKEN_EXPIRE || '30d';
