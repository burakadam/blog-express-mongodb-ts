import express, { Router } from 'express';

const router: Router = express.Router();

import { ROUTES } from '../constants/routes';
import authRouter from './auth';
import permissionRouter from './permissions';
import userRouter from './users';

router.use(ROUTES.USERS.BASE, userRouter);
router.use(ROUTES.AUTH.BASE, authRouter);
router.use(ROUTES.PERMISSIONS.BASE, permissionRouter);

export default router;
