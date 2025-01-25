import { model, Schema } from 'mongoose';
import { TStudent } from './student.interface';

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    branchCode: { type: String, required: true, default: 'null' },
    branchName: { type: String, required: true, default: 'null' },
    phoneNumber: { type: String, required: true, default: 'null' },
    userImg: { type: String, required: true, default: 'null' },
    nid: {
      front: { type: String, required: true, default: 'null' },
      back: { type: String, required: true, default: 'null' },
    },
    gurantor: {
      name: { type: String, required: true, default: 'null' },
      phoneNumber: { type: String, required: true, default: 'null' },
      address: { type: String, required: true, default: 'null' },
      nid: {
        front: { type: String, required: true, default: 'null' },
        back: { type: String, required: true, default: 'null' },
      },
      relationships: { type: String, required: true, default: 'null' },
    },
    isDeleted: { type: Boolean, default: false },
    status: { type: String, default: 'Active' },
  },
  {
    timestamps: true,
  },
);

studentSchema.pre('find', function (next) {
  this.find({
    isDeleted: false,
    status: 'Active',
  });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.findOne({
    isDeleted: false,
    status: 'Active',
  });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: { $eq: false },
      status: { $eq: 'Active' },
    },
  });
  next();
});

export const Student = model<TStudent>('Student', studentSchema);
