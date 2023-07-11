import express from 'express';

import {
    getStoreByUsername,
    getStoreBalanceByUsername
} from '../controller/store';

const router = express.Router();

router.get('/:username', getStoreByUsername);
router.get('/balance/:username', getStoreBalanceByUsername);

export default router;
