import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';

const router = Router();

// assign auth routes
// signup user
router.post(
  '/signup',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthController.signupUser,
);

// login user
router.post(
  '/login',
  validateRequest(UserValidation.loginUserValidationSchema),
  AuthController.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
