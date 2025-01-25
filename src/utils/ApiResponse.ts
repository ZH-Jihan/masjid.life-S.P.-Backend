import { Response } from 'express';
type TResponse = {
  statusCode: number;
  message: string;
  data?: any;
  success?: boolean;
};

export class ApiResponse {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;

  constructor(
    res: Response,
    { statusCode, message, data, success }: TResponse,
  ) {
    this.statusCode = statusCode;
    this.success = success || true;
    this.message = message;
    this.data = data;
    res.status(statusCode).json(this);
  }
}

//*** This Is my Old response method ***/
// export const ApiResponse = <T>(res: Response, data: TResponse<T>) => {
//   res.status(data.statusCode).json({
//     statuscode: data.statusCode,
//     success: data.success || true,
//     message: data.message,
//     data: data,
//   });
// };
