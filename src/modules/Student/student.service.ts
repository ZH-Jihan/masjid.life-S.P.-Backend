import { Student } from './student.model';

const findAllStudentIntoDB = async () => {
  const student = await Student.find();
  return student;
};

export const StudentSevices = {
  findAllStudentIntoDB,
};
