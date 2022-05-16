import Tickets from '../models/ticket.js'

export const getTickets = async (req, res) => {
    try{
        const tickets = await Tickets.find();
        res.status(200).json({ data: tickets});
    }catch (e){
        res.status(404).json({message: e.message});
    }
}

export const createTicket = async (req, res) => {
    const newTicket = new Tickets({ creator: req.userId, createdAt: new Date().toISOString(), status: 'New', handledBy: '', creatorName: req.body.creatorName});
    try{
        const existingNewTicket = await Tickets.findOne({creator: req.userId,status: 'New'});
        const existingHandlingTicket = await Tickets.findOne({creator: req.userId,status: 'Inprogress'});
        if(existingNewTicket || existingHandlingTicket) return res.status(400).json({message: 'User already exists'});
        await newTicket.save();
        res.status(201).json(newTicket);
    }catch (e) {
        res.status(409).json({message: e.message});
    }
}

export const handleOldestNewTicket = async (req,res) => {
    try{
        const resTicket = await Tickets.findOne({status: 'New'}).sort({ createdAt: 1});
        const doneTicket = await Tickets.findByIdAndUpdate(resTicket._id,{handledBy: req.body.userId + '&' + req.body.name, status: 'Inprogress'},{ new: true})

        res.status(200).json(doneTicket);
    }catch (e) {
        res.status(404).json({message: e.message})
    }
}

export const handleInprogressTicket = async (req,res) => {
    debugger;
    try{
        const ticket = await Tickets.findOne({status: 'Inprogress',handledBy: req.body.userId + '&' + req.body.name });
        const result = await Tickets.findByIdAndUpdate(ticket._id,{status: 'Done'}, {new: true});
        console.log('qq')
        res.status(200).json(result);
    }catch (e) {
        res.status(404).json({message: e.message})
    }
}