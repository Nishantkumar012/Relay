import {Router} from "express"
import { authMiddleware } from "../auth/authMiddleware";
import { createConversation, listMyConversation } from "./chatController";



const router = Router();



router.post("/", authMiddleware, createConversation);
router.get("/", authMiddleware, listMyConversation);

export default router;