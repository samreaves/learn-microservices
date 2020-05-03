import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler } from './middeware';
import { NotFoundError, EnvironmentVariableMissing} from './errors';
import { currentUserRouter, signInRouter, signOutRouter, signUpRouter } from './routes';

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
    throw new EnvironmentVariableMissing('NODE_ENV');
}

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: NODE_ENV !== 'test'
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };