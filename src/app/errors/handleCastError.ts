import mongoose from 'mongoose';
import { TErrorMessages, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessages: TErrorMessages = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessages,
  };
};

export default handleCastError;
