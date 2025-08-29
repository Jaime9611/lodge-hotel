import { useSearchParams } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiBooking } from "@services";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isLoading: isPending } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => apiBooking.getAll(page),
  });

  const { content: bookings, totalPages, totalElements: count } = data ?? {};

  // PRE-FETCHING
  if (page < (totalPages ?? 0))
    queryClient.prefetchQuery({
      queryKey: ["bookings", page + 1],
      queryFn: () => apiBooking.getAll(page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", page - 1],
      queryFn: () => apiBooking.getAll(page - 1),
    });

  return { isPending, bookings, count };
};
