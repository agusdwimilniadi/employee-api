import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import { formatResponse } from '../utils/formatResponse';
import Joi from 'joi';

export const getKaryawanTraining = async (req: Request, res: Response) => {
    try {
        const karyawanTrainingList = await prisma.karyawanTraining.findMany({
            include: {
                Karyawan: true,
                Training: true,
            },
        });
        res.json(formatResponse(true, 200, 'Success', karyawanTrainingList));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getKaryawanTrainingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const karyawanTraining = await prisma.karyawanTraining.findUnique({
            where: { id: Number(id) },
            include: {
                Karyawan: true,
                Training: true,
            },
        });
        res.json(formatResponse(true, 200, 'Successzz', karyawanTraining));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const employeeTrainingSchema = Joi.object({
    id_karyawan: Joi.number().required(),
    id_training: Joi.number().required(),
});

export const createKaryawanTraining = async (req: Request, res: Response) => {
    const { error } = employeeTrainingSchema.validate(req.body, {
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
        const { id_karyawan, id_training } = req.body;
        const karyawanTraining = await prisma.karyawanTraining.create({
            data: {
                id_karyawan,
                id_training,
            },
        });
        res.json(formatResponse(true, 200, 'Success', karyawanTraining));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteKaryawanTraining = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const karyawanTraining = await prisma.karyawanTraining.delete({
            where: { id: Number(id) },
        });
        res.json(formatResponse(true, 200, 'Success', karyawanTraining));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateKaryawanTraining = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id_karyawan, id_training } = req.body;
        const karyawanTraining = await prisma.karyawanTraining.update({
            where: { id: Number(id) },
            data: {
                id_karyawan,
                id_training,
            },
        });
        res.json(formatResponse(true, 200, 'Success', karyawanTraining));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
