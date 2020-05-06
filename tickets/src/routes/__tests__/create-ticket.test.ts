import request from 'supertest';
import { app } from '../../app';
import { CREATE_TICKET_ROUTE } from '../../constants';
import { Ticket } from '../../models/Ticket';

it('has a route handler listening to /api/tickets listening for post requests', async () => {
    const response = await request(app)
        .post(CREATE_TICKET_ROUTE)
        .send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if a user is signed in', async () => {
    const response = await request(app)
        .post(CREATE_TICKET_ROUTE)
        .send({})
        .expect(401);
});

it('returns an error if there is no input, but authenticated', async () => {
    const response = await request(app)
        .post(CREATE_TICKET_ROUTE)
        .set('Cookie', global.signUp())
        .send({})
        .expect(400);
});

it('returns an error if there is an invalid title', async () => {
    const response = await request(app)
        .post(CREATE_TICKET_ROUTE)
        .set('Cookie', global.signUp())
        .send({
            price: 25
        })
        .expect(400);
});

it('returns an error if there is an invalid price', async () => {
    const response = await request(app)
    .post(CREATE_TICKET_ROUTE)
    .set('Cookie', global.signUp())
    .send({
        title: 'Atlanta United vs Portland Timbers'
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
    const title = 'Atlanta United vs Portland Timbers';
    const price = 25;
    
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const response = await request(app)
    .post(CREATE_TICKET_ROUTE)
    .set('Cookie', global.signUp())
    .send({
        title,
        price
    })
    .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);
});