import {prisma} from "../config/db"


// get message by
export const getMessagesByConversation = async (
  conversationId: string,
  userId: string,
  cursor?: string,
  limit: number = 20
) => {
  // 1️⃣ Check conversation exists
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // 2️⃣ Check membership
  const member = await prisma.conversationMember.findFirst({
    where: {
      conversationId,
      userId,
    },
  });

  if (!member) {
    throw new Error("You are not a member of this conversation");
  }

  // 3️⃣ Build query
  const messages = await prisma.message.findMany({
    where: {
      conversationId,
      ...(cursor && {
        createdAt: {
          lt: new Date(cursor),
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit + 1, // for hasMore
    include: {
      sender: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  // 4️⃣ Pagination logic
  let hasMore = false;

  if (messages.length > limit) {
    hasMore = true;
    messages.pop();
  }

  const nextCursor =
    messages.length > 0
      ? messages[messages.length - 1]?.createdAt.toISOString()
      : null;

  return {
    messages,
    nextCursor,
    hasMore,
  };
};





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




