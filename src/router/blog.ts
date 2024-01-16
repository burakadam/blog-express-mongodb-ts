import { ROUTES } from '@/constants/routes';
import { createBlog } from '@/controllers/blog';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';
import express, { Router } from 'express';
import multer from 'multer';

const upload = multer();

const router: Router = express.Router();

router.use(ROUTES.BASE, serviceHandler(authentication));

router.post(
  ROUTES.BLOG.CREATE,
  upload.single('poster'),
  serviceHandler(createBlog)
);

export default router;
