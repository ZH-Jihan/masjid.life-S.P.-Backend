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
    tagDonar: {
      type: Schema.Types.ObjectId,
      ref: 'Donar',
      default: null,
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

// check if the student has deleted and deactivated or not
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

// check if the student exist in the database or not
studentSchema.statics.isStudentExist = async function (id: string) {
  return await Student.findOne({
    id,
  });
};

export const Student = model<TStudent>('Student', studentSchema);
