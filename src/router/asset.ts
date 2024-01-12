import { ROUTES } from '@/constants/routes';
import { serviceHandler } from '@/utils/serviceHandler';
import express, { Router } from 'express';

import { postImage } from '@/controllers/asset';
import { authentication } from '@/middleware/auth';
import multer from 'multer';

const upload = multer();

const router: Router = express.Router();

router.use(ROUTES.BASE, upload.single('image'), serviceHandler(authentication));

router.post(ROUTES.ASSET.POST, serviceHandler(postImage));

export default router;
