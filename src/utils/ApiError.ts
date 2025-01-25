import { Response } from 'express';

type TResponse = {
  statusCode: number;
  message: string;
  error?: any;
  success?: boolean;
};

export class ApiError extends Error {
  statusCode: number;
  error: any;
  success: boolean;

  constructor(
    res: Response,
    { statusCode, message, error, success }: TResponse,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = success || true;
    this.error = error;
    res.status(statusCode).json(this);
  }
}
