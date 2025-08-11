import { useEffect, type FC, type ReactNode } from "react";
import { useAuth } from "@contexts";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
  matchRole: string;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, matchRole }) => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  const isAuthorized = role === matchRole;

  useEffect(() => {
    if (!isAuthenticated || !isAuthorized) navigate("/login");
  }, [isAuthenticated, isAuthorized, navigate]);

  if (isAuthenticated && isAuthorized) return children;
};

export default ProtectedRoute;
