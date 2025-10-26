import type { UserGuestModel } from "@models";
import { apiUser } from "@services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UserEditData {
  newUserData: Omit<UserGuestModel, "id">;
  id?: number;
}

export const useCreateGuest = () => {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isPending: isCreating } = useMutation({
    mutationFn: ({ newUserData, id }: UserEditData) =>
      apiUser.createEditGuest(newUserData, id),
    onSuccess: () => {
      toast.success("New Account succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["guest"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createGuest };
};
