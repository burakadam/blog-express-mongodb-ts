import { ROUTES } from '@/constants/routes';
import { createBlog, getBlogs } from '@/controllers/blog';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';
import express, { Router } from 'express';
import multer from 'multer';

const upload = multer();

const router: Router = express.Router();

router.use(ROUTES.BASE, serviceHandler(authentication));

router.post(
  ROUTES.BLOG.CREATE,
  serviceHandler(upload.single('poster')),
  serviceHandler(createBlog)
);

router.post(ROUTES.BLOG.LIST, serviceHandler(getBlogs));

export default router;
