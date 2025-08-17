import type { CabinModelFormResult } from "@models";
import { apiCabin } from "@services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CabinEditData {
  newCabinData: CabinModelFormResult;
  id?: number;
}

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabinData, id }: CabinEditData) =>
      apiCabin.createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("New cabin succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
};
