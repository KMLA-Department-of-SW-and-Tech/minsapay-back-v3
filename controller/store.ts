import { LoginModel } from "../models/Login";
import { StoreModel } from "../models/Store";

import { Request, Response } from "express";

export const getStoreByUsername = async (req: Request, res: Response) => {
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
    const storeData = await StoreModel.findOne({
      _id: login.store,
    });

    return res.status(200).json({
      success: true,
      store: storeData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getStoreBalanceByUsername = async (
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

    const storeData = await StoreModel.findOne({
      _id: login.store,
    });

    if (!storeData) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    return res.status(200).json({
      success: true,
      balance: storeData.balance,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
