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
            .withMessage('title must be valid'),
        body('price')
            .isString()
            .withMessage('price must be valid')
    ],
    requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        const { title, price } = req.body;
        
        res.sendStatus(201);    
});

export { router as createTicketRouter };