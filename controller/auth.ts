import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @ROUTE GET /api/auth/login
// @DESC Login user
// @ACCESS Public

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const payload = {
      user: {
        id: user.id,
      },
      type: {
        isAdmin: false,
        type: user,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET?.toString() || "");

    res.status(200).json({
      success: true,
      username: user.username,
      name: user.name,
      purchases: user.purchases,
      balance: user.balance,
      isSecurePurchase: user.isSecurePurchase,
      securePurchaseEndDate: user.securePurchaseEndDate,
      token: token,
    });
  } catch (err: Error | any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { username, newPassword } = req.body;
  try {
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err: Error | any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* 
export const resetAllUserPassword = async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    users.forEach(async (user) => {
      user.password = hashedPassword;
      await user.save();
    });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err: Error | any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}; 
*/
