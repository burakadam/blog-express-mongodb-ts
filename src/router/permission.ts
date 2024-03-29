import { ROUTES } from '@/constants/routes';
import { getPermissions } from '@/controllers/permission';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';
import express, { Router } from 'express';

const router: Router = express.Router();

router.use(ROUTES.BASE, serviceHandler(authentication));

router.get(ROUTES.PERMISSION.LIST, serviceHandler(getPermissions));

export default router;
