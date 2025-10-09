import { apiUser } from "@services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteEmployee } = useMutation({
    mutationFn: (id: number) => apiUser.deleteEmployee(id),
    onSuccess: () => {
      toast.success("Employee succesfully deleted");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteEmployee };
};
