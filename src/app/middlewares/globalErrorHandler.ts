/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorMessages } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleMongooseError from '../errors/handleMongooseError';
import handleCastError from '../errors/handleCastError';
import AppError from '../errors/AppError';
import config from '../config';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode: number = 500;
  let message: string = 'Something went wrong!';

  let errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const errors = handleZodError(error);
    statusCode = errors?.statusCode;
    message = errors?.message;
    errorMessages = errors.errorMessages;
  } else if (error?.name === 'ValidationError') {
    const errors = handleMongooseError(error);
    statusCode = errors?.statusCode;
    message = errors?.message;
    errorMessages = errors?.errorMessages;
  } else if (error?.name === 'CastError') {
    const errors = handleCastError(error);
    statusCode = errors?.statusCode;
    message = errors?.message;
    errorMessages = errors?.errorMessages;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error.message === 'No Data Found') {
    message = 'No Data Found';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(message === 'No Data Found' ? { data: [] } : { errorMessages }),
    ...(message === 'No Data Found'
      ? null
      : { stack: config.node_env === 'development' ? error?.stack : null }),
  });
};
