import express, { Router } from 'express';

import { login } from '../controllers/auth';
import { serviceHandler } from '../utils/serviceHandler';

const router: Router = express.Router();

router.post('/login', serviceHandler(login));

export default router;
