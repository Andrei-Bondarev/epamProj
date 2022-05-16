import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    status: {type: String, required: true},
    id: {type: String},
})


const user = mongoose.model('user',userSchema);
export default user;