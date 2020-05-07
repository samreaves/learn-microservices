import express, { Request, Response } from 'express';
import { Ticket } from '../models/Ticket';
import { GET_TICKETS_ROUTE } from '../constants';

const router = express.Router();

router.get(
    GET_TICKETS_ROUTE, 
    async (req: Request, res: Response) => {

        const tickets = await Ticket.find();

        res.status(200).send(tickets);  
});

export { router as getTicketsRouter };