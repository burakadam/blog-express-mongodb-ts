import { ROUTES } from '@/constants/routes';
import { createCategory, getCategories } from '@/controllers/category';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';
import express, { Router } from 'express';

const router: Router = express.Router();

router.use(ROUTES.BASE, authentication);

router.post(ROUTES.CATEGORY.CREATE, serviceHandler(createCategory));

router.get(ROUTES.CATEGORY.LIST, serviceHandler(getCategories));

export default router;
