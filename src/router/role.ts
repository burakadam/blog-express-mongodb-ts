import { ROUTES } from '@/constants/routes';
import { createRole } from '@/controllers/role';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';
import express, { Router } from 'express';

const router: Router = express.Router();

router.use(ROUTES.BASE, serviceHandler(authentication));

router.post(ROUTES.ROLE.CREATE, serviceHandler(createRole));

export default router;
