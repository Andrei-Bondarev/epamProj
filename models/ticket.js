import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    creator: String,
    creatorName:String,
    handlerName:String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    status: String,
    handledByName: String,
    handledBy: String,

})

const ticket = mongoose.model('ticket',ticketSchema);
export default ticket;