import { ROUTES } from '@/constants/routes';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from '@/controllers/category';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';
import express, { Router } from 'express';

const router: Router = express.Router();

router.use(ROUTES.BASE, serviceHandler(authentication));

router.post(ROUTES.CATEGORY.CREATE, serviceHandler(createCategory));

router.get(ROUTES.CATEGORY.LIST, serviceHandler(getCategories));

router.post(ROUTES.CATEGORY.UPDATE, serviceHandler(updateCategoryById));

router.post(ROUTES.CATEGORY.DETAIL, serviceHandler(getCategoryById));

export default router;
