import express from "express";
import {protectRoute} from "../middleware/protectRoute.js"
import { getAllContacts , addContact,deleteContact,getContactById,updateContact} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/getAllContacts", protectRoute ,getAllContacts);
router.post("/addContact/:id", protectRoute ,addContact);
router.delete("/deleteContact/:id",protectRoute,deleteContact);
router.post("/updateContact", protectRoute,updateContact);
router.get("/getContactById/:id",protectRoute, getContactById);


export default router;