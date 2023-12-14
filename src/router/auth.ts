import express, { Router } from 'express';

import { ROUTES } from '@/constants/routes';
import { login } from '@/controllers/auth';
import { serviceHandler } from '@/utils/serviceHandler';

const router: Router = express.Router();

router.post(ROUTES.AUTH.LOGIN, serviceHandler(login));

export default router;
