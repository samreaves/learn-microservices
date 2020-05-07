import express, { Request, Response } from 'express';
import { NotFoundError } from '@sr-ticketing/common';
import { Ticket } from '../models/Ticket';
import { GET_TICKET_BY_ID_ROUTE } from '../constants';

const router = express.Router();

router.get(
    GET_TICKET_BY_ID_ROUTE,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const ticket = await Ticket.findById(id);

            if (!ticket) {
                throw new NotFoundError();
            }
    
            res.send(ticket); 
        }
        catch (error) {
            /* Mongo you crazy */
            if (error && error.message.includes('Cast to ObjectId failed for value')) {
                throw new NotFoundError();
            } else {
                throw error;
            }
        }
});

export { router as getTicketByIDRouter };