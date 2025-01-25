import { Router } from 'express';
import { loginUser } from './auth.controller';

const router = Router();

router.route('/login').post(loginUser);

export const AuthRoutes = router;
