import express from "express";
import { login, changePassword, createUsers } from "../controller/auth";

const router = express.Router();

router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/create-users", createUsers);

export default router;
