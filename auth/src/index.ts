import express from 'express';
import { json } from 'body-parser';
import { errorHandler } from './middeware';
import { currentUserRouter, signInRouter, signOutRouter, signUpRouter } from './routes';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(errorHandler);

app.listen(3000, () =>{
    console.log('listening on port 3000')
});