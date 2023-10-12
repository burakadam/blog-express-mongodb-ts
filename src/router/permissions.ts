import express, { Router } from 'express';

import { createPermission, getPermissions } from '../controllers/permissions';
import { authentication } from '../middleware/auth';
import { serviceHandler } from '../utils/serviceHandler';

const router: Router = express.Router();

router.use('/', authentication);

router.post('/createPermisson', serviceHandler(createPermission));

router.get('/getPermissions', serviceHandler(getPermissions));

export default router;
