import { apiBooking } from "@services";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays);

  const { isPending: isLoading, data: stays } = useQuery({
    queryFn: () => apiBooking.getBookingsAfterDate(queryDate, true),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.content.filter(
    (stay) => stay.status === "CHECKED_IN" || stay.status === "CHECKED_OUT"
  );

  return { stays, confirmedStays, numDays, isLoading };
};
