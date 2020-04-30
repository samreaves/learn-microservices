import request from 'supertest';
import { app } from '../../app';
import { SIGNOUT_ROUTE } from '../../constants';
 
it('returns a 200 and deletes the cookie on successful signout', async () => {
    await global.signUp();

    const response = await request(app)
        .post(SIGNOUT_ROUTE)
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});