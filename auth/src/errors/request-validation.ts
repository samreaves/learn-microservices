import { ValidationError } from 'express-validator';
import { CustomError } from './';

export class RequestValidationError extends CustomError {
    status = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return  this.errors.map((error) => {
            return { message: error.msg, field: error.param };
        });
    }
}