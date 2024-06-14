import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { createUserValidation, loginValidation } from './auth.validaton';
import {
  createUserController,
  getMe,
  loginController,
} from './auth.controller';

export const authRoutes: Router = Router();

authRoutes.post(
  '/signup',
  requestValidator(createUserValidation),
  createUserController,
);
authRoutes.post(
  '/login',
  requestValidator(loginValidation),
  loginController,
);
authRoutes.get(
  '/me',
  getMe,
);
