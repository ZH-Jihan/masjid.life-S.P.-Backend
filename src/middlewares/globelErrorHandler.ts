import { ErrorRequestHandler } from 'express';
import http from 'http-status-codes';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 400;
  let message = 'Something went wrong';
  console.log(error);

  if (error?.code === 11000) {
    statusCode = http.NOT_ACCEPTABLE;
    message = `${error?.keyValue.email} This User Already exists`;
  }
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    // stack: confif.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
