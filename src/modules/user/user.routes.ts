import { Router } from 'express';
import { getUserController } from './user.controller';
import auth from '../../middlewares/auth';

export const userRoutes: Router = Router();

userRoutes.get('/me', auth('admin', 'user'), getUserController);
