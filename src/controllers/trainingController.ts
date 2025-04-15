import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import { formatResponse } from '../utils/formatResponse';
import Joi from 'joi';

export const getTraining = async (req: Request, res: Response) => {
    try {
        const trainingList = await prisma.training.findMany();
        res.json(formatResponse(true, 200, 'Success', trainingList));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getTrainingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const training = await prisma.training.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.json(formatResponse(true, 200, 'Success', training));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const trainingSchema = Joi.object({
    pengajar: Joi.string().required(),
    tema: Joi.string().required(),
});
export const createTraining = async (req: Request, res: Response) => {
    const { error } = trainingSchema.validate(req.body, { abortEarly: false });
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
        const { pengajar, tema } = req.body;
        const training = await prisma.training.create({
            data: {
                pengajar,
                tema,
            },
        });
        res.status(200).json(formatResponse(true, 200, 'Success', training));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteTraining = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const training = await prisma.training.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(formatResponse(true, 200, 'Success', training));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const trainingEditSchema = Joi.object({
    pengajar: Joi.string().optional(),
    tema: Joi.string().optional(),
});

export const updateTraining = async (req: Request, res: Response) => {
    const { error } = trainingEditSchema.validate(req.body, {
        abortEarly: false,
    });
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
        const { id } = req.params;
        const { pengajar, tema } = req.body;
        const training = await prisma.training.update({
            where: {
                id: Number(id),
            },
            data: {
                pengajar,
                tema,
            },
        });
        res.status(200).json(formatResponse(true, 200, 'Success', training));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
