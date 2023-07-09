import express from 'express';
import { getUserByUsername } from '../controller/user';

const router = express.Router();

router.get("/username/:username", getUserByUsername);

export default router;

