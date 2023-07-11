import { Router } from 'express';

import {
    createPurchase,
} from '../controller/purchase';

const router = Router();

router.post('/create', createPurchase);

export default router;
