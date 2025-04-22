import { Router } from 'express';
import {
    createRekening,
    deleteRekening,
    getRekening,
    getrekeningById,
    updateRekening,
} from '../controllers/rekeningController';

const router = Router();

router.get('/', getRekening);
router.get('/:id', getrekeningById);
router.post('/', createRekening);
router.delete('/:id', deleteRekening);
router.patch('/:id', updateRekening);

export default router;
