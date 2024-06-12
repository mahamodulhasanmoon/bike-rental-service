import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { createBikeValidation, updateBikeValidation } from './bike.validation';
import { createBikeController, deleteBikeController, getAllBikeController, updateBikeController } from './bike.controller';

export const bikeRoutes:Router = Router();

bikeRoutes.get('/', getAllBikeController);
bikeRoutes.post(
  '/',
  requestValidator(createBikeValidation),
  createBikeController,
);
bikeRoutes.put(
  '/:id',
  requestValidator(updateBikeValidation),
  updateBikeController,
);
bikeRoutes.delete(
  '/:id',
  deleteBikeController,
);
