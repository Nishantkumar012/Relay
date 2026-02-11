import {prisma} from "../config/db"




export const getMessagesByConversation= async(
    conversationId:string,
    userId:string
)=>{
    
        const conversation = await prisma.conversation.findFirst({
            where:{
                id: conversationId,
                members:{
                    some:{
                        userId: userId,
                    }

                }
            }
        })
           
        if(!conversation){
             throw new Error("Conversation not found or acess denied");
        }


        const messages = await prisma.message.findMany({
             where:{
                conversationId,
             },
             orderBy:{
                createdAt: "desc"
             },
             take:20,
             include:{
                sender:{
                    select:{
                        id:true,
                        username: true,

                    },

                },
             },
        });

     return messages.reverse();
}


export const createMessage = async (
  conversationId: string,
  senderId: string,
  content: string
) => {
  // 1️⃣ conversation exist?
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // 2️⃣ sender member hai?
  const isMember = await prisma.conversationMember.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId: senderId,
      },
    },
  });

  if (!isMember) {
    throw new Error("Not a member of this conversation");
  }

  // 3️⃣ message save
  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId,
      content,
    },
  });

  return message;
};
