import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { BookingModelFormResult } from "@models";
import { apiBooking } from "@services";

interface BookingEditData {
  newBookingData: BookingModelFormResult;
  id?: number;
}

export const useEditBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: editBooking, isPending: isEditing } = useMutation({
    mutationFn: ({ newBookingData, id }: BookingEditData) =>
      apiBooking.createEditBooking(newBookingData, id),
    onSuccess: () => {
      toast.success("Booking succesfully edited.");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editBooking };
};
