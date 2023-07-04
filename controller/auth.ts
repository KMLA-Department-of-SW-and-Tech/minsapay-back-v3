import Login from "../models/Login";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import "dotenv/config"
import { generatePassword } from "../functions/generatePassword";

// @ROUTE GET /api/auth/login
// @DESC Login user
// @ACCESS Public

const JWT: string | any = process.env.JWT_SECRET;

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    let login = await Login.findOne({
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
    let login = await Login.findOne({
      username: username,
    });
    if (!login) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    login.password = await bcrypt.hash(newPassword, salt);
    await Login.findOneAndUpdate(
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
  // read first column of list.csv
  const data = fs.readFileSync("list.csv", "utf8");
  const dataArray = data.split(/\r?\n/);
  const usernameArray = dataArray.map((item) => {
    console.log(item.split(",")[0]);
  }
  )
  // create users
  for (let i = 0; i < usernameArray.length; i++) {
    const username = usernameArray[i];
    const password = generatePassword();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const login = new Login({
      username: username,
      password: hashedPassword,
      userType: "user",
    });

  }

  return res.status(200).json({
    message: "Users created successfully",
  }); 
}