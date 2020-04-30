import { BadRequestError } from './bad-request';

export class InvalidUsernameOrPassword extends BadRequestError {
    status = 400;

    constructor() {
        super('Invalid username or password');
        Object.setPrototypeOf(this, InvalidUsernameOrPassword.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}