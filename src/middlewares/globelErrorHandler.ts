import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    // stack: confif.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
