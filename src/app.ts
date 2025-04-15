import express from 'express';
import karyawanRoutes from './routes/karyawanRoutes';
import trainingRoutes from './routes/trainingRoutes';
import employeeTraining from './routes/karyawanTraining';

import { getKaryawanTraining } from './controllers/karyawanTraining';

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use('/api/karyawan', karyawanRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/karyawan_training', employeeTraining);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
