import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { IUser } from '../user/user.interface';
import { createUserService, loginService, refreshTokenService } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { NODE_ENV } from '../../config';

export const createUserController: RequestHandler = catchAsync(
  async (req, res) => {
    const payload: IUser = req.body;
    const result = await createUserService(payload);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Signup successfully',
      data: result,
    });
  },
);

export const loginController: RequestHandler = catchAsync(async (req, res) => {
  const payload: IUser = req.body;
  const result = await loginService(payload);
  const { refreshToken, accessToken,user } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'logged in successfully',
    token:accessToken,
    data: user,
  });
});


export const getMe:RequestHandler = catchAsync(async(req,res) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenService(refreshToken)
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    token: result,
  });


})