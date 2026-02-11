import Router from "express"
import { authMiddleware } from "../auth/authMiddleware";
import {getMessages} from "./messageController"

const router = Router();



router.get("/:conversationId",authMiddleware,getMessages);

export default router;