import { LoginModel } from "../models/Login";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
// import "dotenv/config";
import { generatePassword } from "../util/generatePassword";
// import User from "../models/User";
import { Purchases } from "../interface/Purchases";
import { Products } from "../interface/Products";
import { User } from "../interface/User";
import { Login as LoginInterface } from "../interface/Login";

// @ROUTE GET /api/auth/login
// @DESC Login user
// @ACCESS Public

const JWT: string | any = process.env.JWT_SECRET;

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    let login = await LoginModel.findOne({
      username: username,
    });
    if (!login) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, login.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
    const payload = {
      login: {
        id: login.id,
        userType: login.userType,
      },
    };
    const token = jwt.sign(payload, JWT, {
      expiresIn: 360000,
    });
    return res.status(200).json({
      token: token,
      userType: login.userType,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { username, newPassword } = req.body;
  try {
    let login = await LoginModel.findOne({
      username: username,
    });
    if (!login) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    login.password = await bcrypt.hash(newPassword, salt);
    await LoginModel.findOneAndUpdate(
      { username: username },
      { password: login.password }
    );
    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err: Error | any) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createUsers = async (req: Request, res: Response) => {
  const csv = fs.readFileSync("./list.csv", "utf-8");
  const lines = csv.split("\n");

  const usernames = lines.map((line) => {
    return line.split(",")[0];
  });
  const realNames = lines.map((line) => {
    return line.split(",")[1];
  });
  const grade = lines.map((line) => {
    return line.split(",")[2];
  });

  for (let i = 0; i < usernames.length; i++) {
    try {
      const password = generatePassword();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let userData: User = {
        name: realNames[i],
        purchases: [],
        balance: 0,
        isSecurePurchase: true,
        securePurchaseEndDate: new Date(),
      };
      let newUser: LoginInterface = {
        username: usernames[i],
        password: hashedPassword,
        userType: "user",
        isAdmin: false,
        user: userData,
      };
      await LoginModel.create(newUser);
    } catch (err: Error | any) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  return res.status(200).json({
    message: "Users Initialized Successfully",
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, name, userType, isAdmin } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let userData: User = {
      name: name,
      purchases: [],
      balance: 0,
      isSecurePurchase: true,
      securePurchaseEndDate: new Date(),
    };
    let newUser: LoginInterface = {
      username: username,
      password: hashedPassword,
      userType: userType,
      isAdmin: isAdmin,
      user: userData,
    };
    await LoginModel.create(newUser);
    return res.status(200).json({
      message: "User Created Successfully",
    });
  } catch (err: Error | any) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}