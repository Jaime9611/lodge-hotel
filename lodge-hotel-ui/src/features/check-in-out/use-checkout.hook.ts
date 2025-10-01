import { apiBooking } from "@services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      apiBooking.updateBookingStatus(bookingId, "CHECKED_OUT"),
    onSuccess: (data) => {
      toast.success(`Booking succesfully checked out`);
      queryClient.invalidateQueries({ exact: true });
    },
    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
};
