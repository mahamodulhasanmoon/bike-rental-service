import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { getUserService } from './user.service';

export const getUserController: RequestHandler = catchAsync(
  async (req, res) => {
    console.log(req.user);
    const result = await getUserService(req.user.userId);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  },
);
