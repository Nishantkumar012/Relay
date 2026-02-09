import { Router } from "express";
import authRoutes from "./auth/authRoutes";
import chatRoutes from "./chats/chatRoutes";



const router = Router();

router.use("/auth", authRoutes);
router.use("/chats",chatRoutes);

export default router;
