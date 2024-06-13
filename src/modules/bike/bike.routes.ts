import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { createBikeValidation, updateBikeValidation } from './bike.validation';
import {
  createBikeController,
  deleteBikeController,
  getAllBikeController,
  updateBikeController,
} from './bike.controller';
import auth from '../../middlewares/auth';

export const bikeRoutes: Router = Router();

bikeRoutes.get('/', getAllBikeController);
bikeRoutes.post(
  '/',
  auth('admin'),
  requestValidator(createBikeValidation),
  createBikeController,
);
bikeRoutes.put(
  '/:id',
  auth('admin'),
  requestValidator(updateBikeValidation),
  updateBikeController,
);
bikeRoutes.delete('/:id',auth('admin'), deleteBikeController);
