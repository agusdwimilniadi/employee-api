import express from 'express';
import karyawanRoutes from './routes/karyawanRoutes';
import trainingRoutes from './routes/trainingRoutes';
import employeeTraining from './routes/karyawanTraining';
import rekeningRoutes from './routes/rekeningRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

import { authtenticateToken } from './middleware/authMiddleware';

const app = express();
const PORT = process.env.PORT || 8001;
app.use(cors({

}));
app.use(express.json());
// auth
app.use('/api/auth', authRoutes);

// routes
app.use('/api/karyawan', authtenticateToken, karyawanRoutes);
app.use('/api/training', authtenticateToken, trainingRoutes);
app.use('/api/karyawan_training', authtenticateToken, employeeTraining);
app.use('/api/rekening', authtenticateToken, rekeningRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
