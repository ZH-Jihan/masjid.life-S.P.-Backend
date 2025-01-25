import { Model, Types } from 'mongoose';

type TNid = {
  front: string;
  back: string;
};

type TGurantor = {
  name: string;
  relationships: string;
  nid: TNid;
  phoneNumber: string;
  address: string;
};

export interface TStudent {
  id: string;
  user: Types.ObjectId;
  tagDonar: Types.ObjectId;
  name: string;
  email: string;
  branchCode: string;
  branchName: string;
  phoneNumber: string;
  userImg: string;
  nid: TNid;
  gurantor: TGurantor;
  isDeleted: boolean;
  status: 'Active' | 'Deactivated';
}

export interface TStudentModel extends Model<TStudent> {
  isStudentExist(id: string): Promise<TStudent>;
}
