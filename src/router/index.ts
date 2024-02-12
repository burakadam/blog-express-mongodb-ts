import express, { Router } from 'express';

import { ROUTES } from '@/constants/routes';
import assetRouter from './asset';
import authRouter from './auth';
import blogRouter from './blog';
import categoryRouter from './category';
import permissionRouter from './permission';
import roleRouter from './role';
import userRouter from './user';

const router: Router = express.Router();

router.use(ROUTES.USER.BASE, userRouter);
router.use(ROUTES.AUTH.BASE, authRouter);
router.use(ROUTES.CATEGORY.BASE, categoryRouter);
router.use(ROUTES.ASSET.BASE, assetRouter);
router.use(ROUTES.BLOG.BASE, blogRouter);
router.use(ROUTES.PERMISSION.BASE, permissionRouter);
router.use(ROUTES.ROLE.BASE, roleRouter);

export default router;
