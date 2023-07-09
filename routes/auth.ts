import express from "express";
import { login, changePassword, resetPassword, createUser, createStore } from "../controller/auth";

const router = express.Router();

router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/reset-password", resetPassword);
router.post("/create-user", createUser);
router.post("/create-store", createStore);

export default router;
