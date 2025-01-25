import { Types } from 'mongoose';

export interface TDonar {
  id: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  branchCode: string;
  branchName: string;
  phoneNumber: string;
  userImg: string;
  isDeleted: boolean;
  status: 'Active' | 'Deactivated';
}
