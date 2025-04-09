import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: JSX.Element;
}) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}
