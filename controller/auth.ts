import Login from "../models/Login";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

// @ROUTE GET /api/auth/login
// @DESC Login user
// @ACCESS Public

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    let login = await Login.findOne({
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
        message: "Unauthorized",
      });
    }
    const payload = {
      user: {
        id: login.username,
      },
      type: {
        isAdmin: login.isAdmin,
        type: login.userType,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET?.toString() || "");

    if (login.userType === "user" && login.user) {
      return res.status(200).json({
        success: true,
        username: login.username,
        name: login.user.name,
        purchases: login.user.purchases,
        balance: login.user.balance,
        isSecurePurchase: login.user.isSecurePurchase,
        securePurchaseEndDate: login.user.securePurchaseEndDate,
        token: token,
      });
    } else if (login.userType === "store" && login.store) {
      return res.status(200).json({
        success: true,
        username: login.username,
        name: login.store.name,
        purchases: login.store.purchases,
        balance: login.store.balance,
        token: token,
      });
    } else if (login.userType === "admin") {
      const adminToken = jwt.sign(
        { user: { id: login.username }, isAdmin: true },
        process.env.JWT_SECRET?.toString() || ""
      );
      return res.status(200).json({
        success: true,
        username: login.username,
        token: adminToken,
      });
    }
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const login = await Login.findOne({ username: username });
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    login.password = hashedPassword;
    console.log(login);
    // save new login
    await login.save();
    return res.status(200).json({
      success: true,
      message: "Password changed",
    });
  }
  catch (err: Error | any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
export const createUsers = async (req: Request, res: Response) => {
  const data = fs.readFileSync("./script/userlist.csv", { encoding: "utf-8" });
  const rows = data.split("\n");
  rows.forEach(async (row) => {
    const [username, name, grade, ...others] = row.split(",");
    let setBalance: number = 0;
    if (grade === "3") {
      setBalance = 7000;
    }
    const salt = await bcrypt.genSalt(10);
    let newPassword: string = "";
    const characters: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength: number = characters.length;
    for (let i = 0; i < 6; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const login = new Login({
      username: username,
      password: hashedPassword,
      userType: "user",
      isAdmin: false,
      user: new User({
        name: name,
        purchases: [],
        balance: setBalance,
        isSecurePurchase: false,
        securePurchaseEndDate: new Date(),
      }),
    });
    fs.appendFileSync("users.csv", `${username},${name},${newPassword}\n`, {
      encoding: "utf8",
    });

    await login.save();
  });
};
*/

export const resetAllUserPassword = async (req: Request, res: Response) => {
  /* try {
    
    const users = await Login.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    } 

    const salt = await bcrypt.genSalt(10); */

  /*
    users.forEach(async (user) => {
      let newPassword: string = "";
      const characters: string =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength: number = characters.length;
      for (let i: number = 0; i < 6; i++) {
        newPassword += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      const hashedPassword: string = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      // write to csv file to ./users.csv. Contain username, password
      // /*
      fs.appendFileSync("users.csv", `${user.username},${newPassword}\n`, {
        encoding: "utf-8",
      }); */ /*
      await user.save(); 
    });  */

  // console.log(users.length);
  /*

    for (let i: number = 0; i < users.length; i++) {
      let newPassword: string = "";
      const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength: number = characters.length;
      for (let i: number = 0; i < 6; i++) {
        newPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      const hashedPassword: string = await bcrypt.hash(newPassword, salt);
      users[i].password = hashedPassword;
      /*fs.appendFileSync("users.csv", `${users[i].username},${newPassword}\n`, {
        encoding: "utf-8",
      });*/
  /*
      await users[i].save();
    }

    return res.status(200).json({
      success: true,
      users,
    });
    */
  try {
    const users = await Login.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    users.forEach(async (user) => {
      let newPassword = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        newPassword += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      // write to csv file to ../users.csv. Contain username, password
      fs.appendFileSync("users.csv", `${user.username},${newPassword}\n`, {
        encoding: "utf-8",
      });
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
