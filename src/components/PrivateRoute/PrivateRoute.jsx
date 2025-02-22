import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Show a loading indicator

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
