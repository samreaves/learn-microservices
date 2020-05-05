import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { EnvironmentVariableMissing } from '@sr-ticketing/common';

const { JWT_KEY } = process.env;
if (!JWT_KEY) {
    throw new EnvironmentVariableMissing('JWT_KEY');
}

interface UserPayload {
    id: string,
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, JWT_KEY) as UserPayload;
        req.currentUser = payload;
    }
    catch (error) {
        console.log(error);
    }
    next();
};