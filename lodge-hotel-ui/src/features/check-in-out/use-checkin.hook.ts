import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiBooking } from "@services";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (bookingId: number) =>
      apiBooking.updateBookingStatus(bookingId, "CHECKED_IN"),
    onSuccess: (data) => {
      toast.success(`Booking succesfully checked in`);
      queryClient.invalidateQueries({ exact: true });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
};
