import express, { Request, Response } from 'express';
import { currentUser } from '@sr-ticketing/common';
import { CURRENT_USER_ROUTE } from '../constants'; 

const router = express.Router();

router.get(
    CURRENT_USER_ROUTE,
    currentUser,
    (req: Request, res: Response) => {
        res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };