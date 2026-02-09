import express from 'express';
import http from 'http';
import {app} from './app';
import WebSocket,{ WebSocketServer } from 'ws';
import { stringify } from 'querystring';
import { initSocketServer } from './socket/socket';



const PORT = 3000

// const clients :any = new Set();

const server = http.createServer(app);
initSocketServer(server);


// async function start(){

//       const httpServer = http.createServer(app);
      
//       const wss = new WebSocketServer({ server: httpServer});
      
//       wss.on("connection", async(ws, req) =>{
              
//             console.log("user connected");
//             clients.add(ws);

//             ws.on('message', async(raw)=>{
                           
//                    try {
//                         //   const msg  = JSON.parse(raw.toString());
//                         //     console.log(msg);

//                         const data = JSON.parse(raw.toString());
//                         console.log("received:", data);

//                          const msg = data.msg;

//                            console.log("msg is", msg);
                           
//                             for(const client of clients){
//                                  if(client.readyState == WebSocket.OPEN){

//                                     //    client.send(JSON.stringify("abe ja na"));
                                       
//                                     client.send(JSON.stringify({
//                                           text : msg,
//                                           from: "server"
//                                           }));

                              
//                               }
//                             }
//                    } catch (error) {
//                          console.error("❌ ws message error ", error);
//                    }
//             })
//       })
      
//       httpServer.listen(PORT, ()=>{
//             console.log(`Running on ${PORT}`);
//       })
// }

app.listen(PORT, ()=>{
         
       console.log(`server is running on port ${PORT}`);
})


// start();