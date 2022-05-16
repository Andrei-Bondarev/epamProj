import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import userRouter from './Routes/user.js'
import ticketRouter from './Routes/ticket.js'
const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/user', userRouter);
app.use('/tickets', ticketRouter);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(()=>{app.listen(PORT,() => console.log('works'))})