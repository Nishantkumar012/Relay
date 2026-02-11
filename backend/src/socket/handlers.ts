import { WebSocket } from "ws"
import { authenticateSocket } from "./auth";
import { joinRoom, roomMap } from "./room";
import { createMessage } from "../messages/messageService";
import {broadcastToRoom} from "../socket/room"

const userSocketMap = new Map<string, WebSocket>();

export const handlerConnection = (socket: WebSocket, req: any)=>{
      
    try {

         const url = new URL(req.url, "http://localhost");

         const token  = url.searchParams.get("token");

         if (!token) {
             throw new Error("Token is missing");
         }

         const userId = authenticateSocket(token );

          userSocketMap.set(userId, socket);
          console.log(`✅ User ${userId} connected`);

           socket.on("message", async(raw)=>{
               
               const data = JSON.parse(raw.toString());
              
               // join convo
                  if(data.type === "join"){
                       const roomId = `conversation:${data.conversationId}`;
                       joinRoom(roomId,socket);
                       console.log("i am in join")
                       console.log(roomMap.keys());
                  }

                  // receivemessage
              
                  if (data.type === "send_message") {
                        const { conversationId, content } = data;

                        // 🛑 validation
                        if (
                            !conversationId ||
                            typeof conversationId !== "string" ||
                            !content ||
                            typeof content !== "string" ||
                            content.trim().length === 0
                        ) {
                            socket.send(
                            JSON.stringify({
                                type: "error",
                                message: "Invalid message payload",
                            })
                            );
                            return;
                        }

                        try {
                            // DB save
                            const message = await createMessage(
                            conversationId,
                            userId,
                            content.trim()
                            );

                            const roomId = `conversation:${conversationId}`;

                            // broadcast
                            broadcastToRoom(roomId, {
                            type: "new_message",
                            message,
                            });
                        } catch (err: any) {
                            socket.send(
                            JSON.stringify({
                                type: "error",
                                message: err.message || "Failed to send message",
                            })
                            );
                        }
                        }


           })

          socket.on("close", () => {
            userSocketMap.delete(userId);
            console.log(`❌ User ${userId} disconnected`);
            });

           
    } catch (error) {
        console.log("❌ Socket auth failed");
        socket.close();
        
    }
}

export { userSocketMap};