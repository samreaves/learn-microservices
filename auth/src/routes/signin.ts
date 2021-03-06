import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, InvalidUsernameOrPassword, EnvironmentVariableMissing } from '@sr-ticketing/common';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { Password } from '../services';
import { SIGNIN_ROUTE } from '../constants'; 


const { JWT_KEY } = process.env;
if (!JWT_KEY) {
    throw new EnvironmentVariableMissing('JWT_KEY');
}

const router = express.Router();

router.post(
    SIGNIN_ROUTE, 
    [
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email address'),
        body('password')
            .exists()
            .notEmpty()
            .isString()
            .withMessage('Please provide a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new InvalidUsernameOrPassword();
        }

        const passwordMatch = await Password.compare(existingUser.password, password);
        
        if (!passwordMatch) {
            throw new InvalidUsernameOrPassword();
        }

        const userJWT = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, `${JWT_KEY}`);

        req.session = {
            jwt: userJWT
        }
        
        res.status(200).send(existingUser);
});

export { router as signInRouter };