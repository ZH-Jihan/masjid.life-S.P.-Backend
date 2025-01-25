import mongoose from 'mongoose';
import { TDonar } from '../Donar/donar.interface';
import { Donar } from '../Donar/donar.model';
import { TStudent } from '../Student/student.interface';
import { Student } from '../Student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { genareateDonarId, genareateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const session = await mongoose.startSession();
  try {
    // Start transaction to create a new student
    session.startTransaction();

    // new user creation process will be here
    const userData: Partial<TUser> = {};
    // set all required fields for the new user
    userData.email = payload.email;
    userData.role = 'student';
    userData.id = await genareateStudentId();
    userData.password = password ? password : '12345678';
    // create a new user
    const newUser = await User.create([userData], { session });
    // check that the user successfully created or not
    if (!newUser.length) {
      throw new Error('User creation failed');
    }
    // create a new student
    if (Object.keys(newUser).length) {
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; // reference id

      const newStudent = await Student.create([payload], { session });

      if (!newStudent.length) {
        throw new Error('Student creation failed');
      }

      await session.commitTransaction();
      session.endSession();
      return newStudent;
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const createDonartIntoDB = async (password: string, payload: TDonar) => {
  const session = await mongoose.startSession();
  try {
    // Start transaction to create a new student
    session.startTransaction();

    // new user creation process will be here
    const userData: Partial<TUser> = {};
    // set all required fields for the new user
    userData.email = payload.email;
    userData.role = 'donar';
    userData.id = await genareateDonarId();
    userData.password = password ? password : '12345678';
    // create a new user
    const newUser = await User.create([userData], { session });
    // check that the user successfully created or not
    if (!newUser.length) {
      throw new Error('User creation failed');
    }
    // create a new student
    if (Object.keys(newUser).length) {
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; // reference id

      const newStudent = await Donar.create([payload], { session });

      if (!newStudent.length) {
        throw new Error('Donar creation failed');
      }

      await session.commitTransaction();
      session.endSession();
      return newStudent;
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const tagStudentWithDonarInDB = async (donarId: string, studentId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const tagStudentForDonar = await Donar.findByIdAndUpdate(
      { _id: donarId },
      {
        tagStudent: studentId,
      },
      { new: true, session },
    );

    if (!tagStudentForDonar?.tagStudent) {
      throw new Error('Tag student failed');
    }

    const tagDonarForStudent = await Student.findByIdAndUpdate(
      { _id: studentId },
      {
        tagDonar: donarId,
      },
      { new: true, session },
    );
    if (!tagDonarForStudent?.tagDonar) {
      throw new Error('Tag Donar failed');
    }
    await session.commitTransaction();
    session.endSession();

    return { tagStudentForDonar, tagDonarForStudent };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const UserService = {
  createStudentIntoDB,
  createDonartIntoDB,
  tagStudentWithDonarInDB,
};
