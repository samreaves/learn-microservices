import request from 'supertest';
import { app } from '../../app';
import { GET_TICKET_BY_ID_ROUTE } from '../../constants';
import { Ticket } from '../../models/Ticket';

it('returns a 404 error if ticket with id does not exist', async () => {
    const ticketURL = GET_TICKET_BY_ID_ROUTE.replace(':id', `thisdoesn'texist`);

    const response = await request(app)
        .get(ticketURL)
        .send({})
        .expect(404);
});

it('returns ticket by id if ticket with id exists', async () => {
    const title = 'Atlanta United vs Portland Timbers';
    const price = 25;

    const ticket = Ticket.build({
        title,
        price,
        userId: 'somesupercooluser'
    });
    const { id }  = await ticket.save();
    const ticketURL = GET_TICKET_BY_ID_ROUTE.replace(':id', id);

    const ticketResponse = await request(app)
    .get(ticketURL)
    .send()
    .expect(200);

    expect(ticketResponse.body.id).toEqual(id);
    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});