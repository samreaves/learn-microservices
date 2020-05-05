import request from 'supertest';
import { app } from '../../app';
import { CREATE_TICKET_ROUTE } from '../../constants';

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

it('returns an error if there is an invalid price', async () => {

});

it('creates a ticket with valid inputs', async () => {

});