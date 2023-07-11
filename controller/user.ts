import { LoginModel } from "../models/Login";
import { UserModel } from "../models/User";

import { Request, Response } from "express";

export const getUserByUsername = async (req: Request, res: Response) => {
  if (!req.params.username) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userData = await UserModel.findOne({
      _id: login.user,
    });

    return res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserTypeByUsername = async (req: Request, res: Response) => {
  if (!req.params.username) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      userType: login.userType,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserBalanceByUsername = async (req: Request, res: Response) => {
  if (!req.params.username) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userData = await UserModel.findOne({
      _id: login.user,
    });
    if (!userData) {
      return res.status(406).json({
        success: false,
        message: "Requested user is probably a store",
      });
    }

    return res.status(200).json({
      success: true,
      balance: userData.balance,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
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
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userData = await UserModel.findOne({
      _id: login.user,
    });
    if (!userData) {
      return res.status(406).json({
        success: false,
        message: "Requested user is probably a store",
      });
    }

    return res.status(200).json({
      success: true,
      isSecurePurchase: userData.isSecurePurchase,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const allowPurchaseForMinute = async (req: Request, res: Response) => {
  if (!req.params.username) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userData = await UserModel.findOne({
      _id: login.user,
    });
    if (!userData) {
      return res.status(406).json({
        success: false,
        message: "Requested user is probably a store",
      });
    }

    const newSecurePurchaseEndDate = new Date();
    // Add 1 minute to the current date
    newSecurePurchaseEndDate.setMinutes(
      newSecurePurchaseEndDate.getMinutes() + 1
    );

    userData.securePurchaseEndDate = newSecurePurchaseEndDate;

    await userData.save();

    return res.status(200).json({
      success: true,
      message: "Secure purchase enabled for 1 minute",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const endSecurePurchase = async (req: Request, res: Response) => {
  if (!req.params.username) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    const login = await LoginModel.findOne({
      username: req.params.username,
    });
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userData = await UserModel.findOne({
      _id: login.user,
    });
    if (!userData) {
      return res.status(406).json({
        success: false,
        message: "Requested user is probably a store",
      });
    }
    const newSecurePurchaseEndDate = new Date();
    userData.securePurchaseEndDate = newSecurePurchaseEndDate;

    await userData.save();

    return res.status(200).json({
      success: true,
      message: "Secure purchase disabled",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllUsersWithNegativeBalance = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await UserModel.find({
      balance: { $lt: 0 },
    });

    return res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
