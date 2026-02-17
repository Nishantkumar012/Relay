
import { Request,Response } from "express"
import { getMessagesByConversation } from "./messageService";






export const getMessages = async(req:Request , res:Response)=>{
  
       try {    
                const userId = (req as any).userId;
                const conversationId = req.params.conversationId as string;
                  console.log("step 1")
                if(!conversationId){
                     res.status(400).json({ message:"conversationId is required "});
                     return;
                }
                  
                  console.log("step 2")

                const cursor = req.query.cursor as string | undefined;
                const limit = Math.min(Number(req.query.limit) || 20, 50);

                  console.log("step 3")

                const message = await getMessagesByConversation(conversationId,userId,cursor,limit);

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