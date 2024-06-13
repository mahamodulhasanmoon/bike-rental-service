import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { createUserValidation } from './auth.validaton';
import { createUserController, loginController } from './auth.controller';

export const authRoutes: Router = Router();

authRoutes.post(
  '/signup',
  requestValidator(createUserValidation),
  createUserController,
);
authRoutes.post(
  '/login',
  // requestValidator(createUserValidation),
  loginController,
);
