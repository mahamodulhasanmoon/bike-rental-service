/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
  isDeleted: boolean;
}
export interface IUserMethod {
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel
  extends Model<IUser, Record<string, never>, IUserMethod> {
  isUserExists(id: string): Promise<IUser | null>;
}
