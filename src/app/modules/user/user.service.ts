import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { TUser } from './user.interface';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';

// get profile user
const getUserProfileFromDB = async (loggedUser: JwtPayload) => {
  // check user exist
  const user = await User.isUserExistsByEmail(loggedUser?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findById(user?._id);

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(['name'])
    .filter()
    .fields()
    .paginate()
    .sort();
  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

// get profile user
const updateUserIntoDB = async (
  payload: Partial<TUser>,
  loggedUser: JwtPayload,
) => {
  // check user exist
  const user = await User.isUserExistsByEmail(loggedUser?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findOneAndUpdate(
    { email: loggedUser?.email },
    {
      $set: payload,
    },
    { new: true },
  );

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const findUser = await User.findById(id);

  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndDelete(id);

  return result;
};

const updateRoleFromDB = async (id: string, role: string) => {
  const findUser = await User.findById(id);

  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndUpdate(id, { role });

  return result;
};

export const UserServices = {
  getUserProfileFromDB,
  updateUserIntoDB,
  getAllUsersFromDB,
  deleteUserFromDB,
  updateRoleFromDB,
};
