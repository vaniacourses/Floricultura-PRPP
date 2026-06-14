import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 

const ProtectedRoute = () => {
  const { isAuthenticated, token } = useAuth();

  
  const tokenLocal = localStorage.getItem("token");

  if (!isAuthenticated && !tokenLocal) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
