import { Router } from "express";

import {
  createPurchase,
  getUserPurchaseByUsername,
  getStorePurchaseByUsername,
} from "../controller/purchase";

const router = Router();

router.post("/create", createPurchase);
router.get("/user/:username", getUserPurchaseByUsername);
router.get("/store/:storename", getStorePurchaseByUsername);

export default router;
