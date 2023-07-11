import { UserModel } from "../models/User";
import { StoreModel } from "../models/Store";
import { PurchaseModel } from "../models/Purchase";
import { LoginModel } from "../models/Login";

import { Request, Response } from "express";

import { generateUuid } from "../util/uuid";

export const createPurchase = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.storeName || !req.body.amount || !req.body.productName) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    const account = await LoginModel.findOne({
      username: req.body.username,
    });
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (account.userType !== "user") {
      return res.status(406).json({
        success: false,
        message: "Not a user account",
      });
    }
    const storeAccount = await LoginModel.findOne({
      username: req.body.storeName,
    });
    if (!storeAccount) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }
    if (storeAccount.userType !== "store") {
      return res.status(406).json({
        success: false,
        message: "Not a store account",
      });
    }
    const store = await StoreModel.findOne({
      _id: storeAccount.store,
    });
    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }
    const user = await UserModel.findOne({
      _id: account.user,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const purchase = new PurchaseModel({
        user: user._id,
        store: store._id,
        price: req.body.amount,
        time: new Date(),
        product: req.body.productName,
    });
    await purchase.save();

    const newPurchaseId = purchase._id;

    if (!user.purchases) {
        user.purchases = [];
    }

    user.purchases.push(newPurchaseId);
    user.balance -= req.body.amount;

    await user.save();

    if (!store.purchases) {
        store.purchases = [];
    }

    store.purchases.push(newPurchaseId);
    store.balance += req.body.amount;

    await store.save();

    return res.status(200).json({
        success: true,
        purchase: purchase,
    });

  } catch (err: Error | any) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
