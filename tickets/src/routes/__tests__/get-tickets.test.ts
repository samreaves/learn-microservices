import request from 'supertest';
import { app } from '../../app';
import { GET_TICKETS_ROUTE } from '../../constants';
import { Ticket, TicketDocument } from '../../models/Ticket';

it('returns empty list of tickets if no tickets exist', async () => {
    const response = await request(app)
        .get(GET_TICKETS_ROUTE)
        .send();

    expect(response.body).toEqual([]);

});

it('returns a list of tickets if tickets exist', async () => {
    const title = 'Atlanta United vs Portland Timbers';
    const price = 25;

    const ticket = Ticket.build({
        title,
        price,
        userId: 'somesupercooluser'
    });

    await ticket.save();

    const response = await request(app)
        .get(GET_TICKETS_ROUTE)
        .send();

    expect(Array.isArray(response.body)).toEqual(true);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].title).toEqual(title);
    expect(response.body[0].price).toEqual(price);
    expect(response.body[0].userId as String).toBeDefined();
    expect(response.body[0].id as String).toBeDefined();
});