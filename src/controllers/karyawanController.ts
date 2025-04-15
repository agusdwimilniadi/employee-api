import { Request, Response } from 'express';
import prisma from '../prisma/prismaClient';
import { formatResponse } from '../utils/formatResponse';
import Joi from 'joi';

export const getKaryawan = async (req: Request, res: Response) => {
  try {
    const karyawanList = await prisma.karyawan.findMany({
      include: {
        karyawanDetail: {
          select: {
            nik: true,
            npwp: true,
          },
        },
      },
    });
    res.json(formatResponse(true, 200, 'Success', karyawanList));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getKaryawanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const karyawan = await prisma.karyawan.findUnique({
      where: { id: Number(id) },
      include: {
        karyawanDetail: {
          select: {
            nik: true,
            npwp: true,
          },
        },
      },
    });

    res.json(formatResponse(true, 200, 'Success', karyawan));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const karyawanSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  dob: Joi.date().iso().required(),
  status: Joi.string().required(),
  nik: Joi.string().required(),
  npwp: Joi.string().required(),
});

export const createKaryawan = async (req: Request, res: Response) => {
  const { error } = karyawanSchema.validate(req.body, { abortEarly: false });

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
    const { name, address, dob, status, nik, npwp } = req.body;

    const karyawan = await prisma.karyawanDetail.create({
      data: {
        nik,
        npwp,
        Karyawan: {
          create: {
            name,
            address,
            dob: new Date(dob),
            status,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Karyawan created successfully',
      data: karyawan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const updateKaryawanSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.string().optional(),
  dob: Joi.date().iso().optional(),
  status: Joi.string().optional(),
});

export const updateKaryawan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validasi input
    const { error, value } = updateKaryawanSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res
        .status(400)
        .json(formatResponse(false, 400, 'Validation failed', error.details));
      return;
    }

    // Pastikan ID valid
    if (isNaN(Number(id))) {
      res.status(400).json(formatResponse(false, 400, 'Invalid ID'));
    }

    // Update data
    const karyawan = await prisma.karyawan.update({
      where: { id: Number(id) },
      data: {
        ...value,
        dob: value.dob ? new Date(value.dob) : undefined,
      },
    });

    res.json(formatResponse(true, 200, 'Success', karyawan));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(formatResponse(false, 500, 'Internal Server Error', error));
  }
};

export const deleteKaryawan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const karyawan = await prisma.karyawan.delete({
      where: { id: Number(id) },
    });
    res.json(formatResponse(true, 200, 'Success', karyawan));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
