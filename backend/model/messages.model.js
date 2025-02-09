import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    //messege_id will be assigned by mongoose itself;
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    groupId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Group',
          default:null
         }, 
    content:{
        type:String,
        required:true,
    },
    messageType:{
        type:String,
        required:true,
    },
    isRead:{
        type:Boolean,
        default:false
    },
    timestamps:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

const Messages = mongoose.model("Message",MessageSchema);

export default Messages;

//timestamps will be used to give time the message was sent at...