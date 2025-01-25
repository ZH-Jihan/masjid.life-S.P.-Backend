import { Router } from 'express';
import { createDonar, createStudent } from './user.controller';

const router = Router();

router.route('/create-student').post(createStudent);
router.route('/create-donar').post(createDonar);

export const StudentRoutes = router;
