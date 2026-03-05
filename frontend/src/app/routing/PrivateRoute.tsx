import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

function PrivateRoute() {
  const { token } = useAuthStore();

  if (!token) {
    //  console.log("error a gya");
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default PrivateRoute;
