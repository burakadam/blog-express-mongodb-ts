import express, { Router } from 'express';

const router: Router = express.Router();

import { ROUTES } from '@/constants/routes';
import assetRouter from './asset';
import authRouter from './auth';
import blogRouter from './blog';
import categoryRouter from './category';
import permissionRouter from './permission';
import userRouter from './user';

router.use(ROUTES.USER.BASE, userRouter);
router.use(ROUTES.AUTH.BASE, authRouter);
router.use(ROUTES.CATEGORY.BASE, categoryRouter);
router.use(ROUTES.ASSET.BASE, assetRouter);
router.use(ROUTES.BLOG.BASE, blogRouter);
router.use(ROUTES.PERMISSION.BASE, permissionRouter);

export default router;
