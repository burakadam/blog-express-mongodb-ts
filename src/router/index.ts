import express, { Router } from 'express';

const router: Router = express.Router();

import { ROUTES } from '@/constants/routes';
import assetRouter from './asset';
import authRouter from './auth';
import categoryRouter from './category';
import permissionRouter from './permission';
import userRouter from './user';

router.use(ROUTES.USER.BASE, userRouter);
router.use(ROUTES.AUTH.BASE, authRouter);
router.use(ROUTES.PERMISSION.BASE, permissionRouter);
router.use(ROUTES.CATEGORY.BASE, categoryRouter);
router.use(ROUTES.ASSET.BASE, assetRouter);

export default router;
