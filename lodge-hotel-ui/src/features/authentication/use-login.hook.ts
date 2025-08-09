import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiAuth } from "@services";
import type { UserModel } from "src/services/api-auth.service";

export const useLogin = () => {
  //   const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ username, password }: UserModel) =>
      apiAuth.login({ username, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/cabins", {
        replace: true,
      });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
};
