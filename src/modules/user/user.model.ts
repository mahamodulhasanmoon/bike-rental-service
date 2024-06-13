import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import { saltRound } from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['user', 'admin'],
        message: 'Role must be either user or admin',
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  user.password = await bcrypt.hash(user.password, Number(saltRound));
  next();
});

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExists = async function (email) {
  const existingUser = await User.findOne({ email });
  return existingUser;
};

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.post('save', function (doc, next) {
   doc.password = ''
  next();
});

export const User = model<IUser, IUserModel>('User', userSchema);
