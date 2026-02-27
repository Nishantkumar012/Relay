import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import Dashboard from "./Dashboard"
import LoginPage from "../features/auth/pages/LoginPage";
import ChatPage from "../features/chat/pages/ChatPage";
import PrivateRoute from "./routing/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  { 
     element: <PrivateRoute/>,
     children: [
      {
         path: "/chats",
         element: <ChatPage/>
      }
    ]
  }
]);

export default router;
