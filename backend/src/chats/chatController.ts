import { Request, Response } from "express";
import {
     createDirectConversation,
     getMyConversations,
} from "./chatService";


export const createConversation = async(req:Request, res:Response)=>{
      
      try {
            const userId = (req as any).userId;
            const {otherUserId }= req.body;

            console.log("userId is", userId);
       
            if(!otherUserId){
                  return res.status(400).json({ message: "otherUserId is required" });
            }

            const conversation = await createDirectConversation(userId,otherUserId);
            console.log(conversation+"kuch hi nhi")
            res.status(201).json(conversation);

        } catch (error: any) {
            res.status(500).json({ message: error.message});
      }
}

export const listMyConversation = async(req:Request,res:Response)=>{
      
      try {
                const userId = (req as any).userId;

                const conversations = await getMyConversations(userId);

                res.status(201).json(conversations);
      } catch (error: any) {
          res.status(500).json({ message: error.message});
      }
}