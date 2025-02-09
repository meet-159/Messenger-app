import Messages from "../model/messages.model.js";

export const createMessage = async (req,res) => {
    try {
        const {recieverId,groupId,content,messageType} = req.body;
        
        const senderId = req.user._id;
        if(recieverId){
            //message is sent to a single contact
            var message = new Messages({senderId,recieverId,content,messageType});
        }if(groupId){
            //message is sent in a group chat
            var message = new Messages({recieverId:null,senderId,groupId,content,messageType}) 
        }
        
        if(!message){
            return res.status(400).json({message:"Message not created successfully"})
        }
        await message.save();
        res.status(201).json({message:"Message created successfully"});

    } catch (error) {
        console.log("Error in createmessage controller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const getMessages = async (req,res) => {
    try {
        const {groupId,recieverId} = req.body;
        if(recieverId){
            var messages = await Messages.find({recieverId,senderId:req.user._id}).sort({timestamps:1});
        }if(groupId){
            var messages = await Messages.find({groupId,senderId:req.user._id}).sort({timestamps:1});
        }
        if(!messages){
            return res.status(400).json({message:"No messages found"})
        }
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const deleteMessage = async (req,res) => {
    try {
        
        const {messageId} = req.body;
        const senderId  = req.user._id;
        const message = await Messages.findById(messageId);
        if(!message){
            return res.status(400).json({message:"Message not found"})
            }
        if(message.senderId.toString() !== senderId.toString()){
            return res.status(403).json({message:"You are not authorized to delete this message"});
        }
         // Check if the message was created within the last 1 hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
         if (message.timestamps < oneHourAgo) {
            return res.status(400).json({ message: "You can only delete messages within 1 hour of creation" });
        }
        //delete message
        await  Messages.findByIdAndDelete(messageId);
        return res.status(200).json({message:"Message deleted successfully"});
    } catch (error) {
        console.log("Error in deleteMessage controller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}

export const updateMessage = async (req,res) => {
    try {
        const {messageId, newMessage} = req.body;
        const oldMessage = await Messages.findById(messageId);

        if(newMessage===null) {(newMessage = oldMessage.content);}

        // Check if the message was created within the last 1 hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
         if (oldMessage.timestamps < oneHourAgo) {
            return res.status(400).json({ message: "Messages can be updated only within 1 hour of creation" });
        }
        if(!oldMessage){
            return res.status(404).json({message:"Message not found"})
        }
        if(oldMessage.messageType.toString() !== "text"){
            return res.status(400).json({message:"You can only update text messages"});
        }
        const updatedMessage = await Messages.findByIdAndUpdate(messageId,{content:newMessage},{new:true});
        return res.status(200).json({message:"Message updated Successfully"});
    } catch (error) {
        console.log("Error in updateMessage controller",error.message);
        return res.status(500).json({error:"Internal server error"});
    }
}