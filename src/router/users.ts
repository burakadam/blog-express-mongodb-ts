import express, { Router } from 'express';

import { createUser, getUsers } from '../controllers/users';
import { authentication } from '../middleware/auth';

const router: Router = express.Router();

router.use('/', authentication);

router.post('/createUser', createUser);

router.get('/getUsers', getUsers);

export default router;
