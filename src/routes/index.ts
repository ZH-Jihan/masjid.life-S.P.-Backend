import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { StudentRoutes } from '../modules/Student/student.routes';
import { UserRoutes } from '../modules/User/user.routes';
const router = Router();
const moduleRoutes = [
  {
    path: '/user',
    routes: UserRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/student',
    routes: StudentRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.routes);
});

export default router;
