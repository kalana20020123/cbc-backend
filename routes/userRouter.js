import express from 'express';
import { createUser , loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", createUser); // Route to create a new user
userRouter.post("/login", loginUser); // Route to log in a user

export default userRouter;