import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import { formatResponse } from '../utils/formatResponse';
import Joi from 'joi';

export const getRekening = async (req: Request, res: Response) => {
    try {
        const rekeningList = await prisma.rekening.findMany();
        res.json(formatResponse(true, 200, 'Success', rekeningList));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getrekeningById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rekening = await prisma.rekening.findUnique({
            where: { id: Number(id) },
            include: {
                karyawanDetail: true,
            },
        });
        res.json(formatResponse(true, 200, 'Success', rekening));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const rekeningSchema = Joi.object({
    id_karyawan: Joi.number().required(),
    nama: Joi.string().required(),
    nomor: Joi.string().required(),
    jenis: Joi.string().required(),
});

export const createRekening = async (req: Request, res: Response) => {
    const { error } = rekeningSchema.validate(req.body, {
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
        const { id_karyawan, nama, nomor, jenis } = req.body;
        const rekening = await prisma.rekening.create({
            data: {
                id_karyawan,
                nama,
                nomor,
                jenis,
            },
        });
        res.json(formatResponse(true, 200, 'Success', rekening));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateRekening = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id_karyawan, nama, nomor, jenis } = req.body;
        const rekening = await prisma.rekening.update({
            where: { id: Number(id) },
            data: {
                id_karyawan,
                nama,
                nomor,
                jenis,
            },
        });
        res.json(formatResponse(true, 200, 'Success', rekening));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteRekening = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rekening = await prisma.rekening.delete({
            where: { id: Number(id) },
        });
        res.json(formatResponse(true, 200, 'Success', rekening));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
