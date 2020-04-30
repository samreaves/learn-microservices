import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middeware';
import jwt from 'jsonwebtoken';
import { InvalidUsernameOrPassword } from '../errors';
import { User } from '../models';
import { Password } from '../services';

const router = express.Router();

router.post(
    '/api/users/signin', 
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
        }, `${process.env.JWT_KEY}`);

        req.session = {
            jwt: userJWT
        }
        
        res.status(200).send(existingUser);
});

export { router as signInRouter };