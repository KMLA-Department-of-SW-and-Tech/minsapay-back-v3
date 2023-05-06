import express from 'express';
import { login, changePassword } from '../controller/auth';
import { resetAllUserPassword } from '../controller/auth';

const router = express.Router();

router.post("/login", login);
router.post("/change-password", changePassword);
// router.post("/reset-password", resetAllUserPassword);

export default router;