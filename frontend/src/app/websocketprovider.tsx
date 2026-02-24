import { useEffect, useRef, createContext, useContext } from "react";

type WebSocketContextType = {
  socket: WebSocket | null;
};

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
});

export function webSocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => useContext(WebSocketContext);
