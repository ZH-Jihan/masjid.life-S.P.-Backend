import { Router } from 'express';
import { StudentRoutes } from '../modules/User/user.routes';
const router = Router();
const moduleRoutes = [
  {
    path: '/user',
    routes: StudentRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.routes);
});

export default router;
