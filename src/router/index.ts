import express, { Router } from 'express';

const router: Router = express.Router();

import authRouter from './auth';
import permissionRouter from './permissions';
import userRouter from './users';

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/permissions', permissionRouter);

export default router;
