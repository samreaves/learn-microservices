import { BadRequestError } from './';

export class ExistingUserError extends BadRequestError {
    status = 400;

    constructor() {
        super('User already exists with this email');
        Object.setPrototypeOf(this, ExistingUserError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}