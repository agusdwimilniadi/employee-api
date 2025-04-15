import { Request, Response, Router } from 'express';
import Joi from 'joi';
import prisma from '../prisma/prismaClient';
import {
    loginController,
    registerController,
} from '../controllers/authController';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);

export default router;
