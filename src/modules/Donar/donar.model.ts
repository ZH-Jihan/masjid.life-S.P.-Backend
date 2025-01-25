import { model, Schema } from 'mongoose';
import { TDonar } from './donar.interface';

const donarSchema = new Schema<TDonar>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tagStudent: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    default: 'null',
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
  branchCode: {
    type: String,
    required: true,
    default: 'null',
  },
  branchName: {
    type: String,
    required: true,
    default: 'null',
  },
  phoneNumber: {
    type: String,
    required: true,
    default: 'null',
  },
  userImg: {
    type: String,
    required: true,
    default: 'null',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'Active',
  },
});

// check if the donar has deleted and deactivated or not
donarSchema.pre('find', function (next) {
  this.find({
    isDeleted: false,
    status: 'Active',
  });
  next();
});

donarSchema.pre('findOne', function (next) {
  this.findOne({
    isDeleted: false,
    status: 'Active',
  });
  next();
});

donarSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: { $eq: false },
      status: { $eq: 'Active' },
    },
  });
  next();
});

export const Donar = model<TDonar>('Donar', donarSchema);
