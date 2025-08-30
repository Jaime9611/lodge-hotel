import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { apiBooking } from "@services";

export const useBooking = () => {
  const { bookingId } = useParams() as { bookingId: string };
  const {
    isPending: isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["booking", bookingId], // Unique-ID for the data
    queryFn: () => apiBooking.getBooking(Number(bookingId)), // async-function that calls the API
    retry: false,
  });

  return { isLoading, error, booking };
};
