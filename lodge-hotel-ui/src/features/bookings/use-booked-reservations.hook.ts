import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { apiBooking } from "@services";
import { eachDayOfInterval } from "date-fns";

export const useBookedReservations = () => {
  const { cabinId } = useParams() as { cabinId: string };

  const {
    isPending: isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ["reservation", cabinId],
    queryFn: () => apiBooking.getBookedReservations(Number(cabinId)),
    retry: false,
  });

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookedDates = data
    ? data
        .map((booking) => {
          return eachDayOfInterval({
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
          });
        })
        .flat()
    : [];

  return { isLoading, error, bookedDates };
};
