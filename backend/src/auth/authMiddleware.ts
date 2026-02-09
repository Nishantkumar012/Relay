import { Request, Response, NextFunction} from "express";
import { verifyToken } from "../utils/jwt";

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}


export const authMiddleware= (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
     
      try {
          
         const header = req.headers.authorization;

         if(!header){
             return res.status(401).json({ message: "No token"});
         }

         const token = header.split(" ")[1];
         
         if (!token) {
             return res.status(401).json({ message: "Invalid token format" });
         }
         
         const decoded = verifyToken(token);
         if (  typeof decoded === "object" &&
                decoded !== null &&
                "userId" in decoded &&
                typeof (decoded as any).userId === "string") {
             req.userId = (decoded as { userId: string }).userId;
             console.log("midle",req.userId);
             return next();
         } else {
             return res.status(401).json({ message: "Invalid token payload" });
         }
      } catch (error) {
        
         res.status(401).json({ message: "invalid token"});
      }
}

