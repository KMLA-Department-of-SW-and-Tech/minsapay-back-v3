import express from "express";
import {
  allowPurchaseForMinute,
  changeUserIsSecurePurchaseMode,
  getAllUsersWithNegativeBalance,
  getUserBalanceByUsername,
  getUserByUsername,
  getUserTypeByUsername,
  isUserUsingSecurePurchase,
} from "../controller/user";

const router = express.Router();

router.get("/username/:username", getUserByUsername);
router.get("/type/:username", getUserTypeByUsername);
router.get("/balance/:username", getUserBalanceByUsername);
router.get("/secure/:username", isUserUsingSecurePurchase);
router.post("/purchase/:username", allowPurchaseForMinute);
router.get("/negative", getAllUsersWithNegativeBalance);
router.post("/mode/:username", changeUserIsSecurePurchaseMode);

export default router;
