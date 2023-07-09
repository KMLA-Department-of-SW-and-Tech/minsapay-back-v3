import { LoginModel } from "../models/Login";
import { Request, Response } from "express";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let user = await LoginModel.findOne({
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

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    let users = await LoginModel.find();
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
