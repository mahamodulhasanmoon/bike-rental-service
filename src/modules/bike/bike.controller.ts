import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import {
  createBikeService,
  deleteBikeService,
  getAllBikesService,
  updateBikeService,
} from './bike.service';
import { catchAsync } from '../../utils/catchAsync';
import { IBike } from './bike.interface';
import httpStatus from 'http-status';

export const createBikeController: RequestHandler = catchAsync(
  async (req, res) => {
    const demoData: IBike = req.body;
    const result = await createBikeService(demoData);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Bike added successfully',
      data: result,
    });
  },
);

export const getAllBikeController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await getAllBikesService(req.query);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Bike data fetched successfully',
      data: result,
    });
  },
);
export const updateBikeController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await updateBikeService(req.params.id, req.body);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: 'Bike updated successfully',
      data: result,
    });
  },
);

// For Delete Bikes
export const deleteBikeController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await deleteBikeService(req.params.id);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Bike deleted successfully',
      data: result,
    });
  },
);
