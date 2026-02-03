// import { WebSocket } from 'node:http'
import { useEffect, useState } from 'react'
// import './App.css'




function App() {
  const [msg, setMsg] = useState('')
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);



  
useEffect(()=>{
       const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("Client connected ✅");
    };

    socket.onmessage = (event) => {
      // console.log("Message from server:", event);

      const data = JSON.parse(event.data);
      console.log(data);
      console.log(data.text);

      setMessages(prev => [...prev, data.text])
    };

    socket.onclose = () => {
      console.log("WebSocket closed ❌");
    };
    
      setWs(socket);

    return () => socket.close();

},[])

  const sendmsg = ()=>{
        
        if(ws && ws.readyState == WebSocket.OPEN){
             ws.send(JSON.stringify({
                    msg
                   
             }));
             alert(`msg send ${msg}`);
              setMsg("");
        }
  }


  
  return (
       <>
         <h1>Hello</h1>
         <input
            type='text'
            value={msg}
            onChange={(e)=>setMsg(e.target.value)}
          />
           <button 
             onClick={sendmsg}
           > send msg</button>
           <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
              <h3>Incoming Messages</h3>
              {messages.map((m, i) => (
                <p key={i}>{m}</p>
              ))}
          </div>

       </>
  )
}

export default App
