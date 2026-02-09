import { WebSocket } from "ws"
import { authenticateSocket } from "./auth";

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