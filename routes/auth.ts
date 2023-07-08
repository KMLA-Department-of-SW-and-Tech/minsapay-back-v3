import express from "express";
import { login, changePassword, createUsers, createUser } from "../controller/auth";

const router = express.Router();

router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/create-users", createUsers);
router.post("/create-user", createUser);


export default router;
