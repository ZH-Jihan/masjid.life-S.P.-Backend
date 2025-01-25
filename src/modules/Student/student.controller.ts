import http from 'http-status-codes';
import { ApiResponse } from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandaler';
import { StudentSevices } from './student.service';

const getAllStudent = asyncHandler(async (req, res) => {
  const result = await StudentSevices.findAllStudentIntoDB();

  new ApiResponse(res, {
    statusCode: http.OK,
    message: 'All Students retrieved successfully',
    data: result,
  });
});

export { getAllStudent };
