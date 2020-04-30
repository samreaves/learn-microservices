
import mongoose from 'mongoose';
import { app } from './app';

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