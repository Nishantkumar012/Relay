import {Request, Response} from "express";
import { signupService, loginService } from "./authService";



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