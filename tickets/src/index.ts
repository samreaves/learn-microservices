import mongoose from 'mongoose';
import { app } from './app';
import { EnvironmentVariableMissing } from '@sr-ticketing/common';

const { MONGO_URI } = process.env; 

if (!MONGO_URI) {
    throw new EnvironmentVariableMissing('MONGO_URI');
}

const start = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
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