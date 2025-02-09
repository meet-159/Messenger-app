import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

 router.post("/createGroup",protectRoute);
// router.post("/updateGroup/:groupId",protectRoute,updateGroup);//here admin can remove the members and can change gropu settings
// router.delete("/deleteGroup/:groupId",protectRoute,deleteGroup);
// router.post("/joinGroup/:groupId",protectRoute,joinGroup);


export default router;