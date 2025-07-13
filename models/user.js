import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type: String,
        required: true, // required ensures that the email field must be provided
        unique: true // unique ensures that no two users can have the same email
    },
    firstName : {
        type: String,   
        required: true
    },    
    lastName : {
        type: String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    isBlocked : {
        type: Boolean,
        default : false // default value is false, meaning the user is not blocked by default
    },
    type : {
        type: String,
        default: "customer" // default value is "customer"
    },
    profilePicture : {
        type: String,   
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVVzFIs00C1WVmivQSlqsGgRu2ouRc4slMmQ&s"
    }
    })

    const User = mongoose.model("users", userSchema);

    export default User;