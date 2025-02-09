import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./db/mongodb.connect.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import groupRoutes from "./routes/group.routes.js"


const app = express();
app.use(express.json())//to read stringified json sent from frontend
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/group",groupRoutes)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    connectDB();
})
