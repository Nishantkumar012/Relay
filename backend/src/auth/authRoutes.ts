import { Router } from "express";
import { signup,login} from "./authController"
import { authMiddleware } from "./authMiddleware";


const router = Router();


router.post("/signup",signup);
router.post("/login",login);


router.get("/me", authMiddleware, (req,res) =>{
      
     res.json({ userId: (req as any).userId});
})


export default router;
