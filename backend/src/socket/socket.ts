import { WebSocketServer } from "ws";
import { Server } from "http";
import { handlerConnection } from "./handlers";



export const initSocketServer = (server: Server)=>{
      
       const wss = new WebSocketServer({server});

       wss.on('connection',handlerConnection);

    console.log("🔌 WebSocket server initialized");
}
