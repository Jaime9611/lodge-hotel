import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";
import { apiAuth } from "@services";
import type { UserModel } from "@models";
import { useAuth } from "@contexts";
import { ROUTES } from "@utils/constants";

export const useLogin = () => {
  //   const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ username, password }: UserModel) =>
      apiAuth.login({ username, password }),
    onSuccess: (data) => {
      setAuth(data);
      if (data.user.role === "ROLE_USER")
        navigate("/", {
          replace: true,
        });
      else navigate(`/${ROUTES.dashboard}`, { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
};
