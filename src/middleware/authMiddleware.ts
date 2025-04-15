import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export const secretKey = process.env.JWT_SECRET || 'jwtsecret';

export const authtenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.status(403).json({ message: 'Invalid or expired token' });
            }
            req.user = decoded;
        });
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
