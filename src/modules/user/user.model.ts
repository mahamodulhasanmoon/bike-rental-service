import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, 'Name is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  phone: {
     type: String,
     required: [true, 'Phone number is required'] },
  address: { 
    type: String, 
    required: [true, 'Address is required'] },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: {
      values: ['user', 'admin'],
      message: 'Role must be either user or admin',
    },
    default: 'user',
  },
});

export const User = model<IUser>('User', userSchema);


