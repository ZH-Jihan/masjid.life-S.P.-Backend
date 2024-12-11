import { Router } from "express";
import { accpetTransactions, findDonarsForRecovery, getAllTransaction, getAllTransactionForPublic, postTransactions } from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middelwares/verifyJWT.js";

const router = Router();


router.route('/')
.post(verifyJWT, postTransactions)
.get(getAllTransaction)
router.route('/for-publicReport')
.get(getAllTransactionForPublic)
router.route('/find-donar')
.get(verifyJWT, findDonarsForRecovery)
router.route('/accept')
.put(verifyJWT,accpetTransactions)
router.route('/get-donar')
.put(verifyJWT,accpetTransactions)


export default router;
