import { LoginModel } from "../models/Login";
import { UserModel } from "../models/User";

import { Request, Response } from "express";

export const getUserByUsername = async (req: Request, res: Response) => {
  if (!req.params.username) {
    return res.status(400).json({
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userData = await UserModel.findOne({
      _id: login.user,
    });

    return res.status(200).json({
      user: userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUserTypeByUsername = async (req: Request, res: Response) => {
  if (!req.params.username) {
    return res.status(400).json({
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      userType: login.userType,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUserBalanceByUsername = async (req: Request, res: Response) => {
  if (!req.params.username) {
    return res.status(400).json({
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userData = await UserModel.findOne({
      _id: login.user,
    });
    if (!userData) {
      return res.status(406).json({
        message: "Requested user is probably a store",
      });
    }

    return res.status(200).json({
      balance: userData.balance,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const isUserUsingSecurePurchase = async (
  req: Request,
  res: Response
) => {
  if (!req.params.username) {
    return res.status(400).json({
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userData = await UserModel.findOne({
      _id: login.user,
    });
    if (!userData) {
      return res.status(406).json({
        message: "Requested user is probably a store",
      });
    }

    return res.status(200).json({
      isSecurePurchase: userData.isSecurePurchase,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const allowPurchaseForMinute = async (req: Request, res: Response) => {
  if (!req.params.username) {
    return res.status(400).json({
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userData = await UserModel.findOne({
      _id: login.user,
    });
    if (!userData) {
      return res.status(406).json({
        message: "Requested user is probably a store",
      });
    }

    const newSecurePurchaseEndDate = new Date();
    // Add 1 minute to the current date
    newSecurePurchaseEndDate.setMinutes(
      newSecurePurchaseEndDate.getMinutes() + 1
    );
    console.log(userData.purchases);  

    userData.securePurchaseEndDate = newSecurePurchaseEndDate;

    await userData.save();

    return res.status(200).json({
      message: "Secure purchase enabled for 1 minute",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
