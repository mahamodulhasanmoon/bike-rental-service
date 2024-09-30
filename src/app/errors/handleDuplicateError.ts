/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorMessages, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const statusCode = 400;
  const extractedMessage = error.message.match(/name:\s*"([^"]+)"/);

  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: extractedMessage && `${extractedMessage[1]} is Already Exists`,
    },
  ];

  return {
    statusCode,
    message: 'Already Exists',
    errorMessages,
  };
};

export default handleDuplicateError;
