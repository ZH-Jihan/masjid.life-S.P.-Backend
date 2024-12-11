import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  donateAmount: [
    {
      amount: {
        type: String,
        required: true,
      },
      isAccept: {
        type: Boolean,
        default: false,
      },
      donateBy: {
        type: String,
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  recoveryAmount: [
    {
      amount: {
        type: String,
        required: true,
      },
      isAccept: {
        type: Boolean,
        default: false,
      },
      donateBy: {
        type: String,
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  donar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},

{
  timestamps: true,
}
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
