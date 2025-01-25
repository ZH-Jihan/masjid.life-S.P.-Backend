import { Model } from 'mongoose';

export type TUser = {
  email: String;
  id: String;
  password: String;
  role: 'student' | 'donar';
  status: 'Active' | 'Deactivated';
  isDeleted: Boolean;
};

export interface TUserModel extends Model<TUser> {
  isUserExist(id: string): Promise<TUser>;
}
