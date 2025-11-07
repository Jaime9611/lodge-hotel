import type { UserModelFormResult } from "@models";
import { apiUser } from "@services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UserEditData {
  newUserData: UserModelFormResult;
  id?: number;
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  const { mutate: createEmployee, isPending: isCreating } = useMutation({
    mutationFn: ({ newUserData, id }: UserEditData) =>
      apiUser.createEditEmployee(newUserData, id),
    onSuccess: () => {
      toast.success("New employee succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createEmployee };
};
