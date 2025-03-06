//app.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./db.js";
import router from "./Routes/younglabs.route.js";

dotenv.config();

const port = process.env.PORT || 3000;


const app = express();
connectdb()

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
}));

app.use(express.json());

//Routes
// app.use('/api/newuser', newuserRouter);
app.use('/api', router);

app.get('/', (req, res) => {
    res.send("HELLO WORLD");
});

app.listen(port, () => {
    console.log(`server is listening ${port}`);
});

export default app;