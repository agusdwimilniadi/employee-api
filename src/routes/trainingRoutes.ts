import {
    createTraining,
    deleteTraining,
    getTraining,
    getTrainingById,
    updateTraining,
} from '../controllers/trainingController';

import { Router } from 'express';

export const router = Router();

router.get('/', getTraining);
router.get('/:id', getTrainingById);
router.post('/', createTraining);
router.patch('/:id', updateTraining);
router.delete('/:id', deleteTraining);

export default router;
