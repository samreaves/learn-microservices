import { ValidationError } from 'express-validator';
import { CustomError } from './';

export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to database';
    status = 500;

    constructor(private errors: ValidationError[]) {
        super('Error connecting to database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}