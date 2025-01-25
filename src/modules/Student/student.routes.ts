import { Router } from 'express';
import { getAllStudent } from './student.controller';

const router = Router();

router.route('/').get(getAllStudent);

export const StudentRoutes = router;
