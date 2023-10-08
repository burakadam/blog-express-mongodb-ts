import express, { Router } from 'express';

import { createPermisson } from '../controllers/permissions';
import { authentication } from '../middleware/auth';

const router: Router = express.Router();

router.use('/', authentication);

router.post('/createPermisson', createPermisson);

export default router;
