import express, { Router } from 'express';

import { ROUTES } from '@/constants/routes';
import {
  createUser,
  getUsers,
  toggleUserActiveStatus,
  updateUser,
} from '@/controllers/user';
import { authentication } from '@/middleware/auth';
import { serviceHandler } from '@/utils/serviceHandler';
import multer from 'multer';

const upload = multer();

const router: Router = express.Router();

router.use(ROUTES.BASE, serviceHandler(authentication));

router.post(ROUTES.USER.CREATE, serviceHandler(createUser));

router.post(ROUTES.USER.LIST, serviceHandler(getUsers));

router.post(ROUTES.USER.TOGGLE, serviceHandler(toggleUserActiveStatus));

router.post(
  ROUTES.USER.UPDATE,
  serviceHandler(upload.single('profilePicture')),
  serviceHandler(updateUser)
);

export default router;
