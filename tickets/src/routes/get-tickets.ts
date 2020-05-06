import express, { Request, Response } from 'express';
import { Ticket } from '../models/Ticket';
import { GET_TICKETS_ROUTE } from '../constants';

const router = express.Router();

router.get(
    GET_TICKETS_ROUTE, 
    async (req: Request, res: Response) => {

        res.sendStatus(200)  
});

export { router as getTicketsRouter };