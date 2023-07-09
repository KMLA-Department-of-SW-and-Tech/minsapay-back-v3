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
      userㅔ: userData,
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
