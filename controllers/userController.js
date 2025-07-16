import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import dotenv from 'dotenv'; // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from .env file

// Function to create a new user
export async function createUser(req, res) {
    const newUserData = req.body; 

    if(newUserData.type == "admin") {  // Check if the user is trying to create an admin account
    
        if(req.user ==  null) {   // If the user is not logged in, return an error message
            res.json({
                message: "You should log as an admin"
            });
            return;
        }
       
        if(req.user.type != "admin") {  // If the user is logged in, check if they are an admin
            res.json({
                message: "You should log as an admin"
            });
            return;
        }
    }

    newUserData.password = bcrypt.hashSync(newUserData.password, 10); // Hashing the password

    const user = new User(newUserData); // Creating a new user instance

    try {
        await user.save();
        res.json({
            message: "User is created"
        });
    } catch {
        res.json({
            message: "User is not created"
        });
    }
}

// Function to log in a user
export async function loginUser(req, res) {
    try {
        const users = await User.find({ email: req.body.email }); // Find user by email

        if (users.length == 0) {
            res.json({
                message: "User not found"
            });
        } else {
            const user = users[0]; // Get the first user from the array
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password); // Compare passwords

            if (isPasswordCorrect) {
                const token = jwt.sign({   // Create a JWT token
                    email: user.email, 
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilePicture: user.profilePicture
                }, process.env.SECRET);

                res.json({
                    message: "User logged in successfully",
                    token: token
                });
            } else {
                res.json({
                    message: "Incorrect password"
                });
            }
        }
    } catch (error) {
        res.json({
            message: "An error occurred",
            error: error.message
        });
    }
}



//admin 
//johndoe@example.com   123

//customer
//jjohndoe@example.com  123