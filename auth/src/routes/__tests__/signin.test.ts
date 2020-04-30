import request from 'supertest';
import { app } from '../../app';
import { SIGNIN_ROUTE } from '../../constants';
 
it('returns a 200 and sets a cookie on successful signin', async () => {
    const { email, password } = await global.signUp();

    const response = await request(app)
        .post(SIGNIN_ROUTE)
        .send({
            email,
            password
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('fails with 400 when account does not exist is supplied', async () => {
    const response = await request(app)
        .post(SIGNIN_ROUTE)
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);

    expect(response.get('Set-Cookie')).not.toBeDefined();
});

it('fails with 400 when account exists but incorrect password', async () => {
    const { email } = await global.signUp();

    const response = await request(app)
        .post(SIGNIN_ROUTE)
        .send({
            email,
            password: 'incorrect'
        })
        .expect(400);

    expect(response.get('Set-Cookie')).not.toBeDefined();
});