import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((store) => store);
  return auth.isAuth ? children : <Navigate to="/login" />;
};

export { ProtectedRoute };
