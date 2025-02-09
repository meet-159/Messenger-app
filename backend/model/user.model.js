import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required:true,
    },
    number : {
        type: String,
        required:true,
        length : 10,
    },email : {
        type: String,
        required:true,
    },
    description:{
        head:{
            type:String,
            default:"",

        },
        body:{
            type:String,
            default:"",
        },
    },
    password:{
        type:String,
        required:true,
    },
    profileImg:{
        type:String,
        default:"",
    },
    status:{
        type:Boolean,
        default:false,
    },
    lastSeen:{
        type:Date,
        default:Date.now(),
    },
    contactList:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[]
        }
    ]
},{
    timestamps:true
});

const User = mongoose.model("User", userSchema);

export default User;