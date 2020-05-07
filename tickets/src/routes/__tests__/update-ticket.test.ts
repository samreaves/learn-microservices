import request from 'supertest';
import { app } from '../../app';
import { UPDATE_TICKET_ROUTE } from '../../constants';
import { Ticket } from '../../models/Ticket';

it('can only be accessed if a user is signed in', async () => {
    const title = 'Atlanta United vs Portland Timbers';
    const price = 25;
    
    const ticketURL = UPDATE_TICKET_ROUTE.replace(':id', `thisdoesn'texist`);
    const response = await request(app)
        .put(ticketURL)
        .send({
            title,
            price
        })
        .expect(401);
});

it('returns a 403 if the ticket does not belong to the user', async () => {
    const userId = 'someotheruser';
    const title = 'Atlanta United vs Portland Timbers';
    const price = 25;
    
    const ticket = Ticket.build({
        userId,
        title,
        price
    })
    const { id } = await ticket.save();

    const ticketURL = UPDATE_TICKET_ROUTE.replace(':id', id);
    const response = await request(app)
        .put(ticketURL)
        .set('Cookie', global.signUp())
        .send({
            title,
            price
        })
        .expect(403)
});

it('returns a 404 if the ticket does not exist', async () => {
    const title = 'Atlanta United vs Portland Timbers';
    const price = 25;
    const ticketURL = UPDATE_TICKET_ROUTE.replace(':id', `thisdoesn'texist`);
    const response = await request(app)
        .put(ticketURL)
        .set('Cookie', global.signUp())
        .send({
            title,
            price
        })
        .expect(404);
});

it('returns an error if there is no input, but the ticket belongs to the user', async () => {
    const userId = '1lk24j124l';
    const title = 'Atlanta United vs Portland Timbers';
    const price = 25;
    
    const ticket = Ticket.build({
        userId,
        title,
        price
    })

    const { id } = await ticket.save();

    const ticketURL = UPDATE_TICKET_ROUTE.replace(':id', id);

    const response = await request(app)
        .put(ticketURL)
        .set('Cookie', global.signUp())
        .send({})
        .expect(400);
});

it('returns an error if there is invalid input, but the ticket belongs to the user', async () => {
    const userId = '1lk24j124l';
    const title = 'Atlanta United vs Portland Timbers';
    const price = 25;
    
    const ticket = Ticket.build({
        userId,
        title,
        price
    })

    const { id } = await ticket.save();

    const ticketURL = UPDATE_TICKET_ROUTE.replace(':id', id);

    const response = await request(app)
        .put(ticketURL)
        .set('Cookie', global.signUp())
        .send({
            title: 22,
            price: 'sam'
        })
        .expect(400);
});

it('updates a ticket with valid inputs and permission', async () => {
    const userId = '1lk24j124l';
    const title = 'Atlanta United vs Portland Timbers';
    const price = 25;
    
    const ticket = Ticket.build({
        userId,
        title,
        price
    })

    const { id } = await ticket.save();

    const ticketURL = UPDATE_TICKET_ROUTE.replace(':id', id);
    const newTitle = 'Atlanta United vs New York Redbulls';
    const newPrice = 120;

    const response = await request(app)
        .put(ticketURL)
        .set('Cookie', global.signUp())
        .send({
            title: newTitle,
            price: newPrice
        })
        .expect(200);

    expect(response.body.id).toEqual(id);
    expect(response.body.title).toEqual(newTitle);
    expect(response.body.price).toEqual(newPrice);
    expect(response.body.userId).toEqual(userId);
});