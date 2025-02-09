import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../lib/utils/generateTokenAndsetCookie.js";

export const signUp = async (req,res)=>{
    try {
        // console.log(req.body);
        
        const {username,number,email,description,profileImg,password}  =  req.body;
     // Regular expression for general email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     // Check if the email matches the basic format
     if (!emailRegex.test(email)) {
        res.status(400).json({error:"email format is incorrect"})
     }

     if(number.length !== 10){
        res.status(400).json({error:"phone number must be 10 digits long"})
     }
     if(password.length < 6){
        res.status(400).json({error:"password must be at least 6 characters long"})
     }
     if(!username || !email || !password || !number){
        res.status(400).json({error:"all fields are required"})
     }
    const existingEmail = await User.findOne({email});
    if(existingEmail){
        res.status(400).json({error:"email already exists"})
    }

     const existingUsername = await User.findOne({ username });
     if (existingUsername) {
         return res.status(400).json({ error: "Username already exists" });
     }

     const existingNumber = await User.findOne({ number });
     if (existingNumber) {
         return res.status(400).json({ error: "Phone number already exists" });
     }

     const saltRounds = 10;
     const salt = await bcrypt.genSalt(saltRounds);
     const hashedPassword = await bcrypt.hash(password, salt);

     // Create and save the new user
     const user = new User({
         username,
         number,
         email,
         description,
         profileImg,
         password: hashedPassword,
     });

    

    await user.save();

    // create a cookie
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json(user);
    
    } catch (err) {
        console.log("Error in SignUp Controller",err.message);
        res.status(500).json({error:"Internal server error"});
    }
    

}

export const logIn = async (req,res)=>{
    try {
        const {username, password} = req.body;
        const foundUser = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, (foundUser ? foundUser.password : ""))

        if(!foundUser || !isPasswordCorrect){
            res.status(404).json({error:"invalid username or password"})
        }

        // create a cookie
        generateTokenAndSetCookie(foundUser._id,res);

        res.status(201).json({
            _id: foundUser._id,
            number: foundUser.number,
            username: foundUser.username,
            email: foundUser.email,
            description: foundUser.description,
            status: foundUser.status,
            lastSeen: foundUser.lastSeen,
            profileImg: foundUser.profileImg,
        })

    } catch (error) {
        console.log("Error in login controller:",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const logOut = async (req,res)=>{
    try {

        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out Successfully"});

    } catch (error) {
        console.log("error in logout controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMe = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("error in getMe controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const deleteMe = async(req,res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findByIdAndDelete(userId).select("-password");
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        console.log("error in deleteMe controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}