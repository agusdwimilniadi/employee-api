import { Router } from 'express';
import {
  createKaryawan,
  deleteKaryawan,
  getKaryawan,
  getKaryawanById,
  updateKaryawan,
} from '../controllers/karyawanController';

const router = Router();

router.get('/', getKaryawan);
router.get('/:id', getKaryawanById);
router.post('/', createKaryawan);
router.patch('/:id', updateKaryawan);
router.delete('/:id', deleteKaryawan);



export default router;
