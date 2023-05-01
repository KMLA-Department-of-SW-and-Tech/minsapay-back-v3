import express from 'express';
import { getUserById, getAllUsers } from '../controller/user';

const router = express.Router();

router.get("/:id", getUserById);
router.get("/", getAllUsers);

export default router;

