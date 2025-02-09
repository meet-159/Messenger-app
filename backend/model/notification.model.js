import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        required:true
    },
},
{timestamps:true}
)

const Notification = mongoose.model("Notification",notificationSchema);

export default Notification;