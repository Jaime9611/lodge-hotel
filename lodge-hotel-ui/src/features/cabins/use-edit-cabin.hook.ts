import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { CabinModelFormResult } from "@models";
import { apiCabin } from "@services";

interface CabinEditData {
  newCabinData: CabinModelFormResult;
  id?: number;
}

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: CabinEditData) =>
      apiCabin.createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin succesfully edited.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
};
