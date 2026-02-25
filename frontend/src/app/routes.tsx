import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import Dashboard from "./Dashboard"
import LoginPage from "../features/auth/pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
