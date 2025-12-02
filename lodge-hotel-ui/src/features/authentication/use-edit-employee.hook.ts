import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { UserModelFormResult } from "@models";
import { apiUser } from "@services";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@utils/constants";

interface UserEditData {
  newUserData: UserModelFormResult;
  id?: number;
}

export const useEditEmployee = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: editEmployee, isPending: isEditing } = useMutation({
    mutationFn: ({ newUserData, id }: UserEditData) =>
      apiUser.createEditEmployee(newUserData, id),
    onSuccess: () => {
      toast.success("Employee succesfully edited.");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["user_data"] });
      navigate(ROUTES.dashboard_path);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editEmployee };
};
