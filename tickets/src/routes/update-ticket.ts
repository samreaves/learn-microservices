import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, requireAuth, NotFoundError, InvalidPermissionsError } from '@sr-ticketing/common';
import { Ticket } from '../models/Ticket';
import { UPDATE_TICKET_ROUTE } from '../constants';

const router = express.Router();

router.put(
    UPDATE_TICKET_ROUTE, 
    [
        body('title')
            .isString()
            .trim()
            .not()
            .isEmpty()
            .withMessage('title must be valid'),
        body('price')
            .isFloat({ gt: 0})
            .withMessage('price must be provided and greater than 0')
    ],
    requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, price } = req.body;

        try {
            const ticket = await Ticket.findById(id);

            if (!ticket) {
                throw new NotFoundError();
            }

            if (ticket.userId !== req.currentUser!.id) {
                throw new InvalidPermissionsError();
            }

            ticket.set({
                title,
                price
            });

            await ticket.save();
    
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

export { router as updateTicketRouter };