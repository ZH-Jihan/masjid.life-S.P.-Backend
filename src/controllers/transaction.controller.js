import { ObjectId } from "mongodb";
import { Transaction } from "../models/transation.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiRespons.js";

const getAllTransactionForPublic = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      {
        $addFields: {
          // Calculate totalDonate by summing the 'amount' fields in 'donateAmount'
          totalDonate: {
            $sum: {
              $map: {
                input: "$donateAmount",
                as: "donate",
                in: { $toDouble: "$$donate.amount" },
              },
            },
          },
          // Calculate totalRecovery by summing the 'amount' fields in 'recoveryAmount'
          totalRecovery: {
            $sum: {
              $map: {
                input: "$recoveryAmount",
                as: "recovery",
                in: { $toDouble: "$$recovery.amount" },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "student", // Transaction's student field
          foreignField: "_id", // Users' _id field
          as: "studentInfo", // Results will be stored in userInfo
        },
      },
      {
        $unwind: {
          path: "$studentInfo", // Unwind the userInfo array to merge data
          preserveNullAndEmptyArrays: true, // Keep documents with no matching user
        },
      },
      {
        $set: {
          studentName: {
            $ifNull: ["$studentInfo.fullName", "Unknown"], // Set studentName if fullName exists, else "Unknown"
          },
          username: "$$REMOVE", // Remove unnecessary fields (if any)
          fullName: "$$REMOVE", // Remove any conflicting fullName field
        },
      },
      {
        $group: {
          _id: "$student", // Group by student ID
          totalDonate: { $sum: "$totalDonate" },
          totalRecovery: { $sum: "$totalRecovery" },
          donar: { $first: "$donar" },
          studentName: { $first: "$studentName" },
        },
      },
    ]);

    return res.status(200).json(new ApiResponse(200, data));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      {
        $addFields: {
          // Calculate totalDonate by summing the 'amount' fields in 'donateAmount'
          totalDonate: {
            $sum: {
              $map: {
                input: "$donateAmount",
                as: "donate",
                in: { $toDouble: "$$donate.amount" },
              },
            },
          },
          // Calculate totalRecovery by summing the 'amount' fields in 'recoveryAmount'
          totalRecovery: {
            $sum: {
              $map: {
                input: "$recoveryAmount",
                as: "recovery",
                in: { $toDouble: "$$recovery.amount" },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "student", // Transaction's student field
          foreignField: "_id", // Users' _id field
          as: "studentInfo", // Results will be stored in userInfo
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "donar", // Transaction's student field
          foreignField: "_id", // Users' _id field
          as: "donartInfo", // Results will be stored in userInfo
        },
      },
    ]);
    return res.status(200).json(new ApiResponse(200, data));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const findDonarsForRecovery = async (req, res) => {
  try {
    const user = req?.user;
    console.log(user);
    
    const donars = await Transaction.aggregate([
      {
        $match: { student: user._id },
      },
      {
        $group: { _id: "$donar" },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "donarInfo",
        },
      },
    ]);
    return res.status(200).json(new ApiResponse(200, donars));
  } catch (error) {}
};

const postTransactions = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;

    let newTransaction;
    if (user.role === "student") {
      const exist = await Transaction.aggregate([
        {
          $match: {
            student: new ObjectId(user.id),
            donar: new ObjectId(data.donar),
          },
        },
        {
          $addFields: {
            // Calculate totalDonate by summing the 'amount' fields in 'donateAmount'
            totalDonate: {
              $sum: {
                $map: {
                  input: "$donateAmount",
                  as: "donate",
                  in: { $toDouble: "$$donate.amount" },
                },
              },
            },
            // Calculate totalRecovery by summing the 'amount' fields in 'recoveryAmount'
            totalRecovery: {
              $sum: {
                $map: {
                  input: "$recoveryAmount",
                  as: "recovery",
                  in: { $toDouble: "$$recovery.amount" },
                },
              },
            },
          },
        },
      ]);
      if (!exist) {
        throw new ApiError(405, "Selected donor doesn't have any transaction");
      }
      if (exist) {
        const checkDueAmount = exist[0].totalDonate - exist[0].totalRecovery;
        if (
          exist[0].totalDonate > exist[0].totalRecovery &&
          checkDueAmount >= data?.amount
        ) {
          const existData = await Transaction.findOne({
            student: user.id,
            donar: data.donar,
          });

          existData.recoveryAmount.push({
            amount: data.amount,
            date: Date.now(),
            donateBy: data.donateBy,
            transactionId: data.transactionId,
          });
          existData.save();
          return res.status(200).json(new ApiResponse(200, existData));
        } else {
          return res
            .status(200)
            .json(
              new ApiResponse(
                200,
                {},
                "your Submission amount larger or equal than your Due Amount"
              )
            );
        }
      }
    }
    if (user.role === "donar") {
      const exist = await Transaction.findOne({
        donar: user.id,
        student: data.student,
      });
      if (exist) {
        exist.donateAmount.push({
          amount: data.amount,
          date: Date.now(),
          donateBy: data.donateBy,
          transactionId: data.transactionId,
        });
        exist.save();
        return res.status(200).json(new ApiResponse(200, exist));
      }
      console.log(data);

      newTransaction = await Transaction.create({
        student: data.student,
        donateAmount: {
          amount: data.amount,
          date: Date.now(),
          donateBy: data.donateBy,
          transactionId: data.transactionId,
        },
        donar: user.id,
      });
    }

    return res.status(200).json(new ApiResponse(200, newTransaction));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
const accpetTransactions = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;
    let editedTransaction;
    console.log(user);

    if (user.role === "student") {
      const exist = await Transaction.findOne({
        _id: data.id,
        selectedStudent: user._id,
        donar: data.selectedDonar,
      });

      if (!exist) {
        throw new ApiError(405, "Invalide Info");
      }

      editedTransaction = await Transaction.findByIdAndUpdate(data.id, {
        isAccpected: true,
      });
    }
    if (user.role === "donar") {
      const exist = await Transaction.findOne({
        _id: data.id,
        selectedDonar: user._id,
        student: data.student,
      });

      if (!exist) {
        throw new ApiError(405, "Invalide Info");
      }

      editedTransaction = await Transaction.findByIdAndUpdate(data.id, {
        isAccpected: true,
      });
    }

    return res.status(200).json(new ApiResponse(200, editedTransaction));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export {
  accpetTransactions, findDonarsForRecovery, getAllTransaction,
  getAllTransactionForPublic,
  postTransactions
};

