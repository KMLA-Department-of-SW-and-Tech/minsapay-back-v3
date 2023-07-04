import express from 'express';
import { login, changePassword } from '../controller/auth.js';
const router = express.Router();

router.post('/login', login);
router.post('/change-password', changePassword)

export default router;