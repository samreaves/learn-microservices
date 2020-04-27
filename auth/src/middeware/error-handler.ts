import { Request, Response, NextFunction } from "express";
import { CustomError } from '../errors';

export const errorHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (error instanceof CustomError) {
        return response.status(error.status).send({ errors: error.serializeErrors() });
    }

    response.status(500).send({
        errors: [{ message: 'Something went wrong'}]
    });
};