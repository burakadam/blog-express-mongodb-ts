import express, { Router } from 'express';

import { createUser, getUsers } from '../controllers/user';
import { authentication } from '../middleware/auth';

const router: Router = express.Router();

router.post('/createUser', createUser);

router.post('/getUsers', authentication, getUsers);

export default router;
