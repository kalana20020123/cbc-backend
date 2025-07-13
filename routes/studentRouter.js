import express from "express";
import {getStudent, createStudent, deleteStudent} from "../controllers/studentController.js";

//create studentRouter
const studentRouter = express.Router();  

studentRouter.post("/",createStudent)
studentRouter.get("/",getStudent)
studentRouter.delete("/",deleteStudent)

export default studentRouter;
