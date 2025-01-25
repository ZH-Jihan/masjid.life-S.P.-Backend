import http from 'http-status-codes';
import { ApiResponse } from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandaler';
import { UserService } from './user.service';

const createStudent = asyncHandler(async (req, res) => {
  const { password, studentInfo } = req.body;
  const result = await UserService.createStudentIntoDB(password, studentInfo);

  new ApiResponse(res, {
    statusCode: http.CREATED,
    message: 'Student created successfully',
    data: result,
  });
});

const createDonar = asyncHandler(async (req, res) => {
  const { password, donarInfo } = req.body;
  const result = await UserService.createDonartIntoDB(password, donarInfo);

  new ApiResponse(res, {
    statusCode: http.CREATED,
    message: 'Donar created successfully',
    data: result,
  });
});

export { createDonar, createStudent };
