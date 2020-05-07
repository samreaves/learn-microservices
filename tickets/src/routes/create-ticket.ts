import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, requireAuth } from '@sr-ticketing/common';
import { Ticket } from '../models/Ticket';
import { CREATE_TICKET_ROUTE } from '../constants';

const router = express.Router();

router.post(
    CREATE_TICKET_ROUTE, 
    [
        body('title')
            .isString()
            .trim()
            .not()
            .isEmpty()
            .withMessage('title must be a valid string'),
        body('price')
            .isFloat({ gt: 0})
            .withMessage('price must be provided and greater than 0')
    ],
    requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        const { title, price } = req.body;

        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id
        });
        await ticket.save();
        
        res.status(201).send(ticket); 
});

export { router as createTicketRouter };