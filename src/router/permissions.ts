import express, { Router } from 'express';

import { createPermission, getPermissions } from '../controllers/permissions';
import { authentication } from '../middleware/auth';

const router: Router = express.Router();

router.use('/', authentication);

router.post('/createPermisson', createPermission);

router.get('/getPermissions', getPermissions);

export default router;
