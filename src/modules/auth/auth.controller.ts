import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { IUser } from "../user/user.interface";
import { createUserService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

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