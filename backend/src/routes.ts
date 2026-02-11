import { Router } from "express";
import authRoutes from "./auth/authRoutes";
import chatRoutes from "./chats/chatRoutes";
import messageRoutes from "./messages/messageRoutes";



const router = Router();

router.use("/auth", authRoutes);
router.use("/chats",chatRoutes);
router.use("/messages",messageRoutes);

export default router;
