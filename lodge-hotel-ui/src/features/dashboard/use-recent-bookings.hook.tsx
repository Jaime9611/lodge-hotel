import { apiBooking } from "@services";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays);

  const { isPending: isLoading, data } = useQuery({
    queryFn: () => apiBooking.getBookingsAfterDate(queryDate, true),
    queryKey: ["bookings", `last-${numDays}`],
  });

  const bookings = data?.content ?? [];

  return { bookings, isLoading };
};
