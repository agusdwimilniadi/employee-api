import { Router } from 'express';
import {
    createKaryawanTraining,
    deleteKaryawanTraining,
    getKaryawanTraining,
    getKaryawanTrainingById,
    updateKaryawanTraining,
} from '../controllers/karyawanTraining';

const router = Router();

router.get('/', getKaryawanTraining);
router.get('/:id', getKaryawanTrainingById);
router.post('/', createKaryawanTraining);
router.delete('/:id', deleteKaryawanTraining);
router.put('/:id', updateKaryawanTraining);

export default router;
