import { Request, Response, NextFunction } from "express";
import { RequestValidationError, DatabaseConnectionError } from '../errors';

export const errorHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    console.log(`Something went wrong: ${error}`);

    if (error instanceof RequestValidationError) {
        const formattedErrors = error.errors.map((e) => {
            return { message: e.msg, field: e.param };
        });

        response.status(400).send({ errors: formattedErrors } || 'Something went wrong');
    }

    if (error instanceof DatabaseConnectionError) {

    }
    
};