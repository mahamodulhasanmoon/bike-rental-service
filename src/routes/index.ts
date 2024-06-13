import { Router } from 'express';
import { bikeRoutes } from '../modules/bike/bike.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { rentalRoutes } from '../modules/booking/booking.routes';

type IModulerRoutes = { path: string; route: Router }[];

export const modulerRoutes: IModulerRoutes = [
  {
    path: '/bikes',
    route: bikeRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/rentals',
    route: rentalRoutes,
  },
];
