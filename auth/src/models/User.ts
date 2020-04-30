import mongoose from 'mongoose';
import { Password } from '../services';

/* Below is why I like NestJS / TypeORM */

/* An interface that describes the properties
 * that are required to create a new User */
export interface UserAttributes {
    email: string;
    password: string;
}

/* An interface that describes the properties
 * that User model has */
export interface UserModel extends mongoose.Model<UserDocument> {
    build(attributes: UserAttributes): UserDocument;
}

/* An interface that describes the properties
 * that a User document has */
export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    /* This is gross. Go away Mongo */
{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };