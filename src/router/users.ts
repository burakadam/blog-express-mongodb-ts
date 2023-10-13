import express, { Router } from 'express';

import { ROUTES } from '../constants/routes';
import { createUser, getUsers } from '../controllers/users';
import { authentication } from '../middleware/auth';
import { serviceHandler } from '../utils/serviceHandler';

const router: Router = express.Router();

router.use(ROUTES.BASE, authentication);

router.post(ROUTES.USERS.CREATE, serviceHandler(createUser));

router.get(ROUTES.USERS.LIST, serviceHandler(getUsers));

export default router;
