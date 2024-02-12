import express, { Router } from 'express';

import { ROUTES } from '@/constants/routes';
import { createUser, getUsers } from '@/controllers/user';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';

const router: Router = express.Router();

router.use(ROUTES.BASE, serviceHandler(authentication));

router.post(ROUTES.USER.CREATE, serviceHandler(createUser));

router.get(ROUTES.USER.LIST, serviceHandler(getUsers));

export default router;
