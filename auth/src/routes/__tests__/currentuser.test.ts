import request from 'supertest';
import { app } from '../../app';
import { CURRENT_USER_ROUTE } from '../../constants';
 
it('returns a 200 and the user', async () => {
    const { cookie } = await global.signUp();

    const userResponse = await request(app)
        .get(CURRENT_USER_ROUTE)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(userResponse.body.currentUser.email).toEqual('test@test.com');
    expect(userResponse.body.currentUser.id).toBeDefined();
});

it('returns a 401 if not signed in', async () => {
    const userResponse = await request(app)
        .get(CURRENT_USER_ROUTE)
        .send()
        .expect(200);
    
    expect(userResponse.body.currentUser).toEqual(null);
});