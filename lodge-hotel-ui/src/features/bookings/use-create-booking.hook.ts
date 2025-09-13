import type { BookingModelFormResult } from "@models";
import { apiBooking } from "@services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface BookingEditData {
  newBookingData: BookingModelFormResult;
  id?: number;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isPending: isCreating } = useMutation({
    mutationFn: ({ newBookingData, id }: BookingEditData) =>
      apiBooking.createEditBooking(newBookingData, id),
    onSuccess: () => {
      toast.success("New booking succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBooking };
};
