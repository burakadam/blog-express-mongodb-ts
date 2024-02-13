import { ROUTES } from '@/constants/routes';
import { createRole, getRoleDetail, getRoles } from '@/controllers/role';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';
import express, { Router } from 'express';

const router: Router = express.Router();

router.use(ROUTES.BASE, serviceHandler(authentication));

router.post(ROUTES.ROLE.CREATE, serviceHandler(createRole));

router.get(ROUTES.ROLE.LIST, serviceHandler(getRoles));

router.post(ROUTES.ROLE.DETAIL, serviceHandler(getRoleDetail));

export default router;
