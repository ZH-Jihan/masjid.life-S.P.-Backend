type TResponse<T> = {
  statusCode: number;
  message: string;
  data?: T;
  success?: boolean;
};

class ApiResponse extends Response {
  public success<T>(
    data: T,
    message = 'Success',
    statusCode = 200,
  ): TResponse<T> {
    return { statusCode, message, data, success: true };
  }
}
