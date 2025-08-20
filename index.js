import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; // Import dotenv to manage environment variables / DB url hide kirimta
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import cors from "cors";



dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors())

app.use(bodyParser.json())

// Middleware to parse JSON bodies 
app.use(
    (req, res, next) => {
       const token = req.header("Authorization") ?.replace("Bearer ", "")
       console.log(token);

       if (token != null) {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (!error) {
                req.user = decoded;
            }
        })
       }
         next();
    }
)


//app.use("/api/products",productRouter)
app.use("/api/users",userRouter) 
app.use("/api/products",productRouter) 
app.use("/api/orders", orderRouter); 


//DB connection
const mongoUrl = process.env.MONGO_DB_URI // Use the environment variable for the MongoDB URI


mongoose.connect(mongoUrl,{})

const connection = mongoose.connection

connection.once("open",()=>{
    console.log("Database connected");
})

// Start the server       
app.listen(
    3000,
    ()=>{
        console.log('Server is running on port 3000')
    }
)


