import { ConversationType } from "../../generated/prisma/enums";
import {prisma} from "../config/db";


export const createDirectConversation= async(
    userId: string,
    otherUserId: string
) => {
        
       const existingConversation = await prisma.conversation.findFirst({
            
            where:{
                 type: ConversationType.direct,
                 members: {
                    every: {
                        userId:{
                            in: [userId, otherUserId]
                        },
                    },
                 },
            },
       })


       if(existingConversation){
           return existingConversation;
       }

       const conversation = await prisma.conversation.create({
            data: {
                type: ConversationType.direct,
                members: {
                    create: [
                        {userId},
                        { userId: otherUserId},
                    ],
                },
            },
       });

       return conversation;
};



// getting my convo
export const getMyConversations = async(userId:string) =>{
      
       return prisma.conversation.findMany({
           where:{
            members:{
                some:{
                    userId,
                },
            },
           },
           include:{
              members:{
                 include:{
                    user:{
                        select:{
                            id: true,
                            username: true,
                            // avatarUrl: true,
                        },
                    },
                 },
              },
           },
           orderBy:{
              createdAt: "desc"
           }
       })
}