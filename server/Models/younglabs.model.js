//create schema 
import mongoose from "mongoose";

const GreetingSchema = new mongoose.Schema({
    Name: {type: String, 
        required: [true, "Name is required"],
        },
        Message: {type: String, 
        default: "Hello, welcome to YoungLabs",
        },

});

const Greeting = mongoose.model('Greetings', GreetingSchema);

export default Greeting;