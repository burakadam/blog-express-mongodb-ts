import express, { Router } from 'express';

import { createUser, getUsers } from '../controllers/users';
import { authentication } from '../middleware/auth';
import { serviceHandler } from '../utils/serviceHandler';

const router: Router = express.Router();

router.use('/', authentication);

router.post('/createUser', serviceHandler(createUser));

router.get('/getUsers', serviceHandler(getUsers));

export default router;
