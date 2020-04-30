import { Request, Response, NextFunction } from 'express';
import { currentUser } from './current-user';
import { NotAuthorizedError } from '../errors/not-authorized';

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError()
    }

    next();

};