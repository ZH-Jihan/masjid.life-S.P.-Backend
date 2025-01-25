import httpStatus from 'http-status-codes';
import { ApiResponse } from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandaler';
import { AuthServices } from './auth.service';

const loginUser = asyncHandler(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken } = result;

  new ApiResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
    },
  });
});

export { loginUser };
