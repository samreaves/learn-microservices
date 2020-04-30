import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import { SIGNUP_ROUTE } from '../constants';

jest.setTimeout(30000)

interface SignUpMock {
    email: string,
    password: string,
    cookie: string[]
}

declare global {
    namespace NodeJS {
        interface Global {
            signUp(): Promise<SignUpMock>
        }
    }
}

global.signUp = async () => {
    const email = 'test@test.com';
    const password = 'password';
    const response = await request(app)
        .post(SIGNUP_ROUTE)
        .send({
            email,
            password
        })
        .expect(201);

    return { email, password, cookie: response.get('Set-Cookie') };
}

let mongo: any;

beforeAll(async () => {
    mongo = new MongoMemoryServer();
    const mongoURI = await mongo.getUri();

    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})