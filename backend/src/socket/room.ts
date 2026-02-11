import {WebSocket} from "ws";


export const roomMap = new Map<string, Set<WebSocket>>();

export const joinRoom = (roomId: string, socket:WebSocket)=>{
      
       if(!roomMap.has(roomId)){
            roomMap.set(roomId, new Set());
       }

       // if room exist join the sockets
       roomMap.get(roomId)!.add(socket)
       
};


export const leaveRoom  = (roomId:string, socket:WebSocket)=>{
       
       roomMap.get(roomId)?.delete(socket);
}


export const broadcastToRoom = (
    roomId: string,
    payload: any
)=>{
      const sockets = roomMap.get(roomId);

        if(!sockets) return;
     
        for(const socket of sockets){
             socket.send(JSON.stringify(payload));
        }
};