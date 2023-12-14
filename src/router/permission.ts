import express, { Router } from 'express';

import { ROUTES } from '@/constants/routes';
import { createPermission, getPermissions } from '@/controllers/permission';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';

const router: Router = express.Router();

router.use(ROUTES.BASE, authentication);

router.post(ROUTES.PERMISSION.CREATE, serviceHandler(createPermission));

router.get(ROUTES.PERMISSION.LIST, serviceHandler(getPermissions));

export default router;
