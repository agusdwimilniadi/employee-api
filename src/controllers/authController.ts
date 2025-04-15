import { Request, Response } from 'express';
import Joi from 'joi';
import prisma from '../prisma/prismaClient';
import { formatResponse } from '../utils/formatResponse';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secretKey } from '../middleware/authMiddleware';

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});
export const registerController = async (req: Request, res: Response) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Validation failed',
            errors: error.details.map((err) => err.message),
        });
        return;
    }
    try {
        const { name, email, password } = req.body;
        const emailCheck = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (emailCheck) {
            res.json(
                formatResponse(false, 400, 'Failed', {
                    message: 'Email already registered',
                })
            );
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
            omit: {
                password,
            },
        });
        res.json(formatResponse(true, 201, 'Success', user));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const loginController = async (req: Request, res: Response) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'Validation failed',
            errors: error.details.map((err) => err.message),
        });
        return;
    }

    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            res.status(400).json(
                formatResponse(true, 400, 'Invalid email or password')
            );
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json(
                formatResponse(true, 400, 'Invalid email or password')
            );
            return;
        }

        const token = jwt.sign(
            {
                email: user.email,
                name: user.email,
                id: user.id,
            },
            secretKey,
            {
                expiresIn: '1h',
            }
        );
        res.json(
            formatResponse(true, 200, 'Success', {
                token,
            })
        );
    } catch (error) {
        res.json(formatResponse(false, 500, 'error', error));
    }
};
