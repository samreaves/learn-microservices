import express, { Request, Response } from 'express';
import { requireAuth } from '@sr-ticketing/common';
import { Ticket } from '../models/Ticket';
import { GET_TICKETS_ROUTE } from '../constants';

const router = express.Router();

router.get(
    GET_TICKETS_ROUTE, 
    requireAuth,
    async (req: Request, res: Response) => {

        res.sendStatus(200)  
});

export { router as ticketsRouter };