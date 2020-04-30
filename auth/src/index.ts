import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { errorHandler } from './middeware';
import { NotFoundError } from './errors';
import { currentUserRouter, signInRouter, signOutRouter, signUpRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-clusterip-service:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to DB');
    }
    catch (error) {
        console.error(error);
    }

    app.listen(3000, () =>{
        console.log('listening on port 3000')
    });
}

start();