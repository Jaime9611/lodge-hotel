import type { BookingModelFormResult } from "@models";
import { apiBooking } from "@services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface BookingEditData {
  newBookingData: BookingModelFormResult;
  id?: number;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createBooking, isPending: isCreating } = useMutation({
    mutationFn: ({ newBookingData, id }: BookingEditData) =>
      apiBooking.createEditBooking(newBookingData, id),
    onSuccess: () => {
      toast.success("New booking succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate(ROUTES.bookings_path);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createBooking };
};
