import { NextFunction, Request, RequestHandler, Response } from 'express';

// handle controller error and resolve if no error. also send this error global error
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsync;
