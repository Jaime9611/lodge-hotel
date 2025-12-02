import type { UserModelFormResult } from "@models";
import { apiUser } from "@services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UserEditData {
  newUserData: UserModelFormResult;
  id?: number;
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createEmployee, isPending: isCreating } = useMutation({
    mutationFn: ({ newUserData, id }: UserEditData) =>
      apiUser.createEditEmployee(newUserData, id),
    onSuccess: () => {
      toast.success("New employee succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      navigate(ROUTES.dashboard_path);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createEmployee };
};
