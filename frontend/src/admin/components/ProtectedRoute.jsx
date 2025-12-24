import { Navigate } from "react-router-dom";

/*
  This component protects admin routes.
  If no JWT token is found, user is redirected to login.
*/

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
