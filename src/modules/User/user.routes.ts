import { Router } from 'express';
import {
  createDonar,
  createStudent,
  tagStudentWithDonar,
} from './user.controller';

const router = Router();

router.route('/create-student').post(createStudent);
router.route('/create-donar').post(createDonar);
router.route('/taging-student').post(tagStudentWithDonar);

export const UserRoutes = router;
