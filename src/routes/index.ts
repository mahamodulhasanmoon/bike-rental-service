import { Router } from 'express';
import { bikeRoutes } from '../modules/bike/bike.routes';

type IModulerRoutes = [{ path: string; route: Router }];


export const modulerRoutes: IModulerRoutes = [
  {
    path: '/bikes',
    route: bikeRoutes,
  },
];