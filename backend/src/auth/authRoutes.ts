import { Router } from "express";
import { signup,login,getMe} from "./authController"
import { authMiddleware } from "./authMiddleware";


const router = Router();


router.post("/signup",signup);
router.post("/login",login);


router.get("/me", authMiddleware, getMe)


export default router;
