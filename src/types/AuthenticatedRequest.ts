import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: any; // atau bisa didefinisikan lebih detail kalau kamu tahu isinya
}
