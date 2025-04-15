import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import { formatResponse } from '../utils/formatResponse';

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
