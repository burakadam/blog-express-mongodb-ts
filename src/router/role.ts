import { ROUTES } from '@/constants/routes';
import { createRole, getRoles } from '@/controllers/role';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';
import express, { Router } from 'express';

const router: Router = express.Router();

router.use(ROUTES.BASE, serviceHandler(authentication));

router.post(ROUTES.ROLE.CREATE, serviceHandler(createRole));

router.get(ROUTES.ROLE.LIST, serviceHandler(getRoles));

export default router;
