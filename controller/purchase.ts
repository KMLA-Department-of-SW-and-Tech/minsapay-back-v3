import { UserModel } from "../models/User";
import { StoreModel } from "../models/Store";
import { PurchaseModel } from "../models/Purchase";
import { LoginModel } from "../models/Login";

import { Request, Response } from "express";

export const createPurchase = async (req: Request, res: Response) => {
  if (
    !req.body.username ||
    !req.body.storeName ||
    !req.body.amount ||
    !req.body.productName ||
    !req.body.nameOfStore ||
    !req.body.nameOfUser
  ) {
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

    if (user.isSecurePurchase && user.securePurchaseEndDate < new Date()) {
      return res.status(403).json({
        success: false,
        message: "User did not authorize purchase",
      });
    }
    const date = new Date();
    const newDate =
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0");
    // make HH:MM:SS, fill in the blanks with 0

    console.log(newDate);
    const purchase = new PurchaseModel({
      user: user._id,
      store: store._id,
      price: req.body.amount,
      time: newDate,
      product: req.body.productName,
      nameOfStore: req.body.nameOfStore,
      nameOfUser: req.body.nameOfUser,
      userAmount: user.balance - req.body.amount,
      storeAmount: store.balance + req.body.amount,
    });

    await purchase.save();

    const newPurchaseId = purchase._id;

    if (!user.purchases) {
      user.purchases = [];
    }

    user.purchases.push(newPurchaseId);
    user.balance -= req.body.amount;
    user.securePurchaseEndDate = new Date();

    await user.save();

    if (!store.purchases) {
      store.purchases = [];
    }

    store.purchases.push(newPurchaseId.toString());
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

export const getUserPurchaseByUsername = async (
  req: Request,
  res: Response
) => {
  if (!req.params.username) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    const account = await LoginModel.findOne({
      username: req.params.username,
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

    const user = await UserModel.findOne({
      _id: account.user,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const purchases = await PurchaseModel.find({
      _id: {
        $in: user.purchases,
      },
    });

    return res.status(200).json({
      success: true,
      purchases: purchases,
    });
  } catch (err: Error | any) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getStorePurchaseByUsername = async (
  req: Request,
  res: Response
) => {
  if (!req.params.storename) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    const account = await LoginModel.findOne({
      username: req.params.storename,
    });
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    if (account.userType !== "store") {
      return res.status(406).json({
        success: false,
        message: "Not a store account",
      });
    }

    const store = await StoreModel.findOne({
      _id: account.store,
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }
    const purchases = await PurchaseModel.find({
      _id: {
        $in: store.purchases,
      },
    });

    return res.status(200).json({
      success: true,
      purchases: purchases,
    });
  } catch (err: Error | any) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
