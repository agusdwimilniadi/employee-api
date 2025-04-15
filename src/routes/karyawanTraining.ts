import { Router } from 'express';
import {
    getKaryawanTraining,
    getKaryawanTrainingById,
} from '../controllers/karyawanTraining';

const router = Router();

router.get('/', getKaryawanTraining);
router.get('/:id', getKaryawanTrainingById);

export default router;
