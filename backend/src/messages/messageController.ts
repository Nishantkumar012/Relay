
import { Request,Response } from "express"
import { getMessagesByConversation } from "./messageService";






export const getMessages = async(req:Request , res:Response)=>{
  
       try {    
                const userId = (req as any).userId;
                const conversationId = req.params.conversationId as string;

                if(!conversationId){
                     res.status(400).json({ message:"conversationId is required "});
                     return;
                }

                const message = await getMessagesByConversation(conversationId,userId);

                return res.status(200).json({
                    success: true,
                    data: message,
                });

       } catch (error: any) {
           return res.status(403).json({
               success: false,
               message: error.message || "Unbale to fetch message"
           })
       }
}