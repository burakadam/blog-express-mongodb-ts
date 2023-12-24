import express, { Router } from 'express';

import { ROUTES } from '@/constants/routes';
import { login, me } from '@/controllers/auth';
import { serviceHandler } from '@/utils/serviceHandler';

const router: Router = express.Router();

router.post(ROUTES.AUTH.LOGIN, serviceHandler(login));

router.get(ROUTES.AUTH.ME, serviceHandler(me));

export default router;
