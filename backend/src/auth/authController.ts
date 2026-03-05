import {Request, Response} from "express";
import { signupService, loginService,meService } from "./authService";



export const signup = async(req:Request,res:Response)=>{
      
       try {
              const {username,email,password} = req.body;
              const result = await signupService(username,email,password);
            //   console.log("in controller");
              res.status(201).json(result);
       } catch (error: any) {
           res.status(400).json({ message: error.message});
       }
}


export const login = async(req:Request, res:Response)=>{
      
      try {
               const {email,password} = req.body;
               const result = await loginService(email,password);
               res.status(201).json(result);

      } catch (error: any) {
           res.status(400).json({ message: error.message});
      }
}


export const getMe = async (req: Request, res: Response) => {
  
  
       try {
//     console.log("inside controller get");

    const userId = req.userId as string;

    const result = await meService(userId);

    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === "User not found") {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

