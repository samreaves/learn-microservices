import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';
import { EnvironmentVariableMissing } from '@sr-ticketing/common';
import { SIGNUP_ROUTE } from '../constants';

const { JWT_KEY } = process.env;
if (!JWT_KEY) {
    throw new EnvironmentVariableMissing('JWT_KEY');
}

jest.setTimeout(30000)

declare global {
    namespace NodeJS {
        interface Global {
            signUp(): string[]
        }
    }
}

global.signUp = () => {
    const payload = {
        id: '1lk24j124l',
        email: 'test@test.com'
    };

    const token = jwt.sign(payload, JWT_KEY);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`express:sess=${base64}`];
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