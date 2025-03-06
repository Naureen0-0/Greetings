//import schema from model and write Logics for Greetings
import Greeting from "../Models/younglabs.model.js";

const greetUser = async(req, res)=> {
    const{Name} = req.body;

    if(!Name || Name.trim() === " ") {
        return res.status(400).json({ message: "Name is required"});
    }

    try {
        const greeting = new Greeting({ Name});
        await greeting.save();
        res.status(201).json({ message: `Hello, ${Name}! Welcome to YoungLabs`});
    } catch (error){
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};

const getgreeting = async(req, res) =>{
    try {
        const greeting = await Greeting.find();
        res.status(200).json({greeting});
    } catch(error){
        res.status(500).json({message: "server error", error: error.message});
    }
};

export {greetUser, getgreeting};