import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createMessage, getMessages,deleteMessage , updateMessage} from "../controllers/messages.controller.js";
const router = express.Router();

router.get("/getMessages",protectRoute,getMessages);
router.post("/createMessage",protectRoute,createMessage);
router.post("/updateMessage",protectRoute,updateMessage)
router.delete("/deleteMessage",protectRoute,deleteMessage);

export default router;
