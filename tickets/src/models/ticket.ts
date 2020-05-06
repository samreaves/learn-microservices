import mongoose from 'mongoose';

/* Below is why I like NestJS / TypeORM */

/* An interface that describes the properties
 * that are required to create a new Ticket */
export interface TicketAttributes {
    title: string;
    price: number;
    userId: string;
}

/* An interface that describes the properties
 * that Ticket model has */
export interface TicketModel extends mongoose.Model<TicketDocument> {
    build(attributes: TicketAttributes): TicketDocument;
}

/* An interface that describes the properties
 * that a Ticket document has */
export interface TicketDocument extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
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
        },
        versionKey: false
    }
});

ticketSchema.statics.build = (attributes: TicketAttributes) => {
    return new Ticket(attributes);
};

const Ticket = mongoose.model<TicketDocument, TicketModel>('Ticket', ticketSchema);

export { Ticket };