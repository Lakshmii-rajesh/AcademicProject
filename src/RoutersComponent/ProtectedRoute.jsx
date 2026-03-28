import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // ❌ Role not allowed
  if (!allowedRoles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/" />;
  }

  // ✅ Allowed
  return children;
}

export default ProtectedRoute;