import request from 'supertest';
import { app } from '../../app';
import { SIGNUP_ROUTE } from '../../constants';

it('returns a 201 and sets a cookie on successful signup', async () => {
    const response = await request(app)
        .post(SIGNUP_ROUTE)
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns a 400 on invalid email input', async () => {
    return request(app)
        .post(SIGNUP_ROUTE)
        .send({
            email: 'asgasdg',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 on invalid password', async () => {
    return request(app)
        .post(SIGNUP_ROUTE)
        .send({
            email: 'test@test.com',
            password: 'asg'
        })
        .expect(400);
});

it('returns a 400 on no input', async () => {
    return request(app)
        .post(SIGNUP_ROUTE)
        .send({})
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
    .post(SIGNUP_ROUTE)
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);

    return request(app)
    .post(SIGNUP_ROUTE)
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400);
});