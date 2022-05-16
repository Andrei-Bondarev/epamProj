import express from "express";
import {createTicket, getTickets, handleInprogressTicket, handleOldestNewTicket} from "../controllers/ticket.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get('/',getTickets);
router.post('/',auth,createTicket);
router.post('/handleNew',handleOldestNewTicket);
router.post('/handleInprogress',handleInprogressTicket);
export default router;