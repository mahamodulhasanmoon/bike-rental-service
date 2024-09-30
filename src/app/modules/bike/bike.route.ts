import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidations } from './bike.validation';
import { BikeController } from './bike.controller';
import auth from '../../middlewares/auth';

const router = Router();

// assign bike routes
router.post(
  '/',
  auth('admin'),
  validateRequest(BikeValidations.createBikeValidation),
  BikeController.createBike,
);

router.get('/', BikeController.getAllBikes);
router.get('/:id', BikeController.singleBike);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(BikeValidations.updateBikeValidation),
  BikeController.updateBike,
);

router.delete('/:id', auth('admin'), BikeController.deleteBike);

export const BikeRoutes = router;
