import { Donar } from '../Donar/donar.model';
import { User } from './user.model';

const lastUserId = async () => {
  const user = await User.findOne(
    {
      role: 'Student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return user?.id ? user.id : undefined;
};

export const genareateStudentId = async () => {
  let currentId = (0).toString();
  const lastStudentId = await lastUserId();
  if (lastStudentId) {
    currentId = (lastStudentId as string).substring(2);
  }
  let newId = (Number(currentId) + 1).toString().padStart(4, '0');
  newId = `S-${newId}`;
  return newId;
};
const lastDonarId = async () => {
  const user = await Donar.findOne(
    {
      role: 'Donar',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return user?.id ? user.id : undefined;
};

export const genareateDonarId = async () => {
  let currentId = (0).toString();
  const lastdonarId = await lastDonarId();
  if (lastdonarId) {
    currentId = (lastdonarId as string).substring(2);
  }
  let newId = (Number(currentId) + 1).toString().padStart(4, '0');
  newId = `D-${newId}`;
  return newId;
};
