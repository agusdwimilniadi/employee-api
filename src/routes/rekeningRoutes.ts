import { Router } from 'express';
import {
    createRekening,
    getRekening,
    getrekeningById,
} from '../controllers/rekeningController';

const router = Router();

router.get('/', getRekening);
router.get('/:id', getrekeningById);
router.post('/', createRekening);

export default router;
