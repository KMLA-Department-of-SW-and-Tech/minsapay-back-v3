import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User as UserInterface } from "../interface/User";
import { Login as LoginInterface } from "../interface/Login";
import { Store as StoreInterface } from "../interface/Store";

import { LoginModel } from "../models/Login";
import { UserModel } from "../models/User";
import { StoreModel } from "../models/Store";

import { generatePassword } from "../util/generatePassword";

import "dotenv/config";

const JWT: string | any = process.env.JWT_SECRET;

export const login = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  const { username, password } = req.body;
  try {
    let login = await LoginModel.findOne({
      username: username,
    });
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, login.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const payload = {
      login: {
        id: login.id,
        username: login.username,
        userType: login.userType,
        isAdmin: login.isAdmin,
      },
    };
    const token = jwt.sign(payload, JWT, {
      expiresIn: 360000,
    });
    return res.status(200).json({
      token: token,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { username, newPassword } = req.body;
  if (!username || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    let login = await LoginModel.findOne({
      username: username,
    });
    if (!login) {
      return res.status(404).json({
        success: false,
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
      success: true,
      message: "Password changed successfully",
    });
  } catch (err: Error | any) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    let users = await LoginModel.find({
      userType: "user",
    });
    let result: Object = {};
    for (let i = 0; i < users.length; i++) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = generatePassword();
      users[i].password = await bcrypt.hash(newPassword, salt);
      await LoginModel.findOneAndUpdate(
        { username: users[i].username },
        { password: users[i].password }
      );
      result = {
        ...result,
        [users[i].username]: newPassword,
      };
    }
    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
      result: result,
    });
  } catch (err: Error | any) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  try {
    let login = await LoginModel.findOne({
      username: username,
    });
    if (login) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData: UserInterface = {
      name: name,
      purchases: [],
      balance: 0,
      isSecurePurchase: true,
      securePurchaseEndDate: new Date(),
    };

    const createdUser = await UserModel.create(userData);

    let newUser: LoginInterface = {
      username: username,
      password: hashedPassword,
      userType: "user",
      isAdmin: false,
      user: createdUser.id,
    };
    await LoginModel.create(newUser);
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err: Error | any) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createStore = async (req: Request, res: Response) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
    return res.status(400).json({
      success: false,
      message: "Malformed request syntax",
    });
  }
  const login = await LoginModel.findOne({
    username: username,
  });
  if (login) {
    return res.status(409).json({
      success: false,
      message: "Username already exists",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const storeData: StoreInterface = {
      name: name,
      purchases: [],
      products: [],
      balance: 0,
    };

    const createdUser = await StoreModel.create(storeData);

    let newUser: LoginInterface = {
      username: username,
      password: hashedPassword,
      userType: "store",
      isAdmin: false,
      store: createdUser.id,
    };

    await LoginModel.create(newUser);

    return res.status(200).json({
      success: true,
      message: "Store created successfully",
    });
  } catch (err: Error | any) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
