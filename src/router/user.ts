import express, { Router } from 'express';

import { ROUTES } from '../constants/routes';
import { createUser, getUsers } from '../controllers/user';
import { authentication } from '../middleware/auth';
import { checkPermission } from '../middleware/permission';
import { serviceHandler } from '../utils/serviceHandler';

const router: Router = express.Router();

router.use(
  ROUTES.BASE,
  serviceHandler(authentication),
  serviceHandler(checkPermission)
);

router.post(ROUTES.USER.CREATE, serviceHandler(createUser));

router.get(ROUTES.USER.LIST, serviceHandler(getUsers));

export default router;
