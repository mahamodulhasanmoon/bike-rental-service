import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// get user profile controller
const getUserProfile = catchAsync(async (req, res) => {
  const result = await UserServices.getUserProfileFromDB(req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const { result, meta } = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved All users successfully',
    meta,
    data: result,
  });
});

// update user controller
const updateUserProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserIntoDB(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

const deleteUsers = catchAsync(async (req, res) => {
  const { id } = req.params;
  await UserServices.deleteUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users deleted successfully',
    data: null,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await UserServices.updateRoleFromDB(id, role);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users role update successfully',
    data: result,
  });
});

export const UserController = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUsers,
  updateRole,
};
