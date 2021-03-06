import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js'

export const signin = async (req,res) => {
    const {phone,password} = req.body;
    try{
        const existingUser = await user.findOne({phone});

        if(!existingUser) return res.status(404).json({message: 'User doesnt exist'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({ phone: existingUser.phone, id: existingUser._id }, 'test', {expiresIn: '1h'});

        res.status(200).json({ result: existingUser, token });
    }catch (e){
        res.status(500).json({message: 'Something went wrong'});
    }
}
export const signup = async (req,res) => {
    const {phone, password, firstName, lastName, confirmPassword} = req.body;

    try{
        const existingUser = await user.findOne({phone});

        if(existingUser) return res.status(400).json({message: 'User already exists'});

        if(password !== confirmPassword) return res.status(400).json({message: 'Password dont match'});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await user.create({ phone, password: hashedPassword, name: `${firstName} ${lastName}`, status: 'client'})

        const token = jwt.sign({ phone: result.phone, id: result._id }, 'test', {expiresIn: '1h'});

        res.status(200).json({ result, token });
    }catch (e){
        res.status(500).json({message: 'Something went wrong'});
    }
}