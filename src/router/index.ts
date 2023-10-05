import express, { Router } from 'express';

const router: Router = express.Router();

import authRouter from './auth';
import userRouter from './user';

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
