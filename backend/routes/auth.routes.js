import express from "express";
import {signUp,logIn,logOut,getMe, deleteMe} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/signUp",signUp);
router.get("/logIn",logIn);
router.get("/logOut",logOut);
router.delete("/deleteMe",protectRoute,deleteMe);
router.get("/getMe",protectRoute,getMe);

export default router;