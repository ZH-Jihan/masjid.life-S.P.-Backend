import { model, Schema } from 'mongoose';
import { TUser, TUserModel } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    email: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, default: 'Active' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUserExist = async function (id: string) {
  return await User.findOne({
    id,
  });
};

export const User = model<TUser, TUserModel>('User', userSchema);
