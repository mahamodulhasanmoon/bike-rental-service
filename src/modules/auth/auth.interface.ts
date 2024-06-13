import { Types } from 'mongoose';

export interface ILogin {
  email: string;
  password: string;
}

export type TJwtPayload = {
  userId: Types.ObjectId;
  email: string;
  name: string;
  role: string;
};
