import { Response } from 'express';

interface IResponse<T> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
}

export const sendResponse = <T>(
  res: Response,
  { data, message, status, success, token }: IResponse<T>,
) => {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    message = 'data not Found';
    success = false;
  }
  return res.status(status).json({
    status,
    success,
    message,
    data,
    token,
  });
};
