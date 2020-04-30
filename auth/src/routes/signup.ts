import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest } from '../middeware';
import { User } from '../models/User';
import { ExistingUserError, EnvironmentVariableMissing } from '../errors';
import { SIGNUP_ROUTE } from '../constants';

const { JWT_KEY } = process.env;
if (!JWT_KEY) {
    throw new EnvironmentVariableMissing('JWT_KEY');
}

const router = express.Router();

router.post(
    SIGNUP_ROUTE, 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ExistingUserError();
        }
        const user = User.build({ email, password });
        await user.save();

        const userJWT = jwt.sign({
            id: user.id,
            email: user.email
        }, `${process.env.JWT_KEY}`);

        req.session = {
            jwt: userJWT
        }
        
        res.sendStatus(201);    
});

export { router as signUpRouter };