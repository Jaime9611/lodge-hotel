import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiAuth } from "@services";
import type { UserLoginModel, UserModel } from "@models";
import { useAuth } from "@contexts";
import { ROUTES } from "@utils/constants";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ username, password }: UserLoginModel) =>
      apiAuth.login({ username, password }),
    onSuccess: (data) => {
      setAuth(data);
      navigate(`/${ROUTES.dashboard}`, { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
};
