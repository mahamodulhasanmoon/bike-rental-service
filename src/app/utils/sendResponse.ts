import { Response } from 'express';
import { TResponse } from '../interface/response';

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const responseData: TResponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
    paymentSession: data.paymentSession,
  };

  if (data.token) {
    responseData.token = data.token;
  }
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
