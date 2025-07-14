import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

// Function to create a new user
export function createUser(req, res) {

    const newUserData = req.body; 

    newUserData.password = bcrypt.hashSync(newUserData.password, 10); // Hashing the password

    const user = new User(newUserData); // Creating a new user instance

    user.save().then(() => {
        res.json({
            message: "User is created"
        });
    }).catch(() => {
        res.json({
            message: "User is not created"
        });
    });
}

// Function to log in a user
export function loginUser(req, res) {
    
    User.find({email : req.body.email}).then( // Find user by email
        (users) => {
            if (users.length == 0) { 
                res.json({
                    message: "User not found"
                })
            } else {
                const user = users[0] // Get the first user from the array
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password); // Compare the provided password with the stored hashed password

                if (isPasswordCorrect) {
                    
                    const token = jwt.sign({ // Create a JWT token
                       email: user.email, // Include user email in the token
                       firstName: user.firstName,
                       lastName: user.lastName,
                       isBlocked: user.isBlocked,
                       type: user.type,
                       profilePicture: user.profilePicture
                    } , "cbc-secret-key-7973") // Sign the token with a secret key
                    
                    res.json({
                        message: "User logged in successfully",
                        token: token
                    });

                } else {
                    res.json({
                        message: "Incorrect password"
                    })
                }               
            }
        }
    ).catch((error) => {
        res.json({
            message: "An error occurred",
            error: error.message
        });
    });
      
    
}

