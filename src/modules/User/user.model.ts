import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
