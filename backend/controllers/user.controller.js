import User from "../model/user.model.js";

export const getAllContacts = async (req,res)=>{
    try {
        const userId = req.user._id;
        const users =await User.findById(userId).populate({
            path: 'contactList',
            select: '-password'
        })
        .select("-password");
        if(!users){
            return res.status(404).json({message:"No contacts found"});
        }
        res.status(200).json(users);
    } catch (error) {
        console.log("error in getAllContacts controller",error);
        res.status(500).json({error:"Internal server error"})
    }
}

export const addContact = async (req,res)=>{
    try {
        const userId = req.user._id;
        const idToAdd = req.params.id;
        const updateUser = await User.findByIdAndUpdate(userId,{$addToSet:{contactList:idToAdd}}, {new:true})
        .select("-password");
        if(!updateUser){
            return res.status(404).json({message:"No user found"});
        }
        res.status(200).json(updateUser);
    } catch (error) {
        console.log("error in addContact controller",error);
        res.status(500).json({error:"Internal server error"})
    
    }
}

export const deleteContact = async (req,res)=>{
    try {
        const userId = req.user._id;
        const idToDelete = req.params.id;
        const updateUser = await User.findByIdAndUpdate(userId,{$pull:{contactList:idToDelete}}, {new:true})
        .select("-password");
        if(!updateUser){
            return res.status(404).json({message:"No user found"});
        }
        res.status(200).json(updateUser);
        
    } catch (error) {
        console.log("error in deleteContact controller",error);
        res.status(500).json({error:"Internal server error"})
    }
}

export const getContactById = async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        if(!user){
            return res.status(404).json({message:"No user found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("error in getContactById controller",error);
        res.status(500).json({error:"Internal server error"})
    }
}

export const  updateContact = async(req,res)=>{

    try {
        const userId = req.user._id;
        const {username,number,email,description,profileImg} = req.body;
        const updateUser = await User.findByIdAndUpdate(userId,{$set:{username,number,email,description,profileImg}}, {new:true}).select("-password");
        if(!updateUser){
            return res.status(404).json({message:"No user found"});
        }
        res.status(200).json(updateUser);
    } catch (error) {
        console.log("error in updateContact controller",error);
        res.status(500).json({error:"Internal server error"})
    }

}