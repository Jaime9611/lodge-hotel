import { useSearchParams } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiBooking } from "@services";
import type { FilterOptions } from "src/services/api-booking.service";

const FILTERS: { [key: string]: string } = {
  "checked-in": "CHECKED_IN",
  "checked-out": "CHECKED_OUT",
  unconfirmed: "UNCONFIRMED",
};

const getFilterValue = (value: string): string => FILTERS[value];

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter: undefined | FilterOptions =
    !filterValue || filterValue === "all"
      ? undefined
      : { field: "status", value: getFilterValue(filterValue) };

  // SORTBY
  const sortByRaw = searchParams.get("sortBy") || "id-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isLoading: isPending } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => apiBooking.getAll(filter, sortBy, page),
  });

  const { content: bookings, totalPages, totalElements: count } = data ?? {};

  // PRE-FETCHING
  if (page < (totalPages ?? 0))
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => apiBooking.getAll(filter, sortBy, page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => apiBooking.getAll(filter, sortBy, page - 1),
    });

  return { isPending, bookings, count };
};
