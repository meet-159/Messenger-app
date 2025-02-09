import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Group name is required
    trim: true,
  },
  description: {
    type: String, // Optional description of the group
    default: "",
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "member"], // Different roles in the group
        default: "member",
      },
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages", // Reference to the Message model
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // The user who created the group
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the group was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the group was last updated
  },
  groupImage: {
    type: String, // URL or path to the group's profile picture
    default: "", // Optional
  },
  isPrivate: {
    type: Boolean,
    default: false, // Determines if the group is private or public
  },
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
