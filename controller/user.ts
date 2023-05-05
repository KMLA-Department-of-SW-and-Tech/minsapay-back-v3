import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

// @ROUTE GET /api/user/:id
// @DESC Get user by id
// @ACCESS Public

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let user = await User.findOne({
      username: id.toString(),
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err: Error | any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @ROUTE GET /api/user/
// @DESC Get all users
// @ACCESS Public

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    let users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
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