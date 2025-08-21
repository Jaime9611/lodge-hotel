import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading((_) => true);
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
    setIsLoading((_) => false);
  };

  return { logout, isLoading };
};
