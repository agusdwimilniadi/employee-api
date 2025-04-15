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
            where: {
                id: Number(id),
            },
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
    const { error } = rekeningSchema.validate(req.body, { abortEarly: false });
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

        const karyawan = await prisma.karyawan.findUnique({
            where: { id: id_karyawan },
        });

        if (!karyawan) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: `Karyawan dengan id ${id_karyawan} tidak ditemukan.`,
            });
        }

        const rekening = await prisma.rekening.create({
            data: {
                nama,
                nomor,
                jenis,
                id_karyawan,
            },
        });

        res.json(formatResponse(true, 200, 'Success', rekening));
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
