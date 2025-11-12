import { useSearchParams } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCabin } from "@services";

export const useCabins = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // SORTBY
  const sortByRaw = searchParams.get("sortBy") || "id-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isLoading: isPending } = useQuery({
    queryKey: ["cabins", sortBy, page],
    queryFn: () => apiCabin.getAll(sortBy, page),
  });

  const { content: cabins, totalPages, totalElements: count } = data ?? {};

  // PRE-FETCHING
  if (page < (totalPages ?? 0))
    queryClient.prefetchQuery({
      queryKey: ["cabins", sortBy, page + 1],
      queryFn: () => apiCabin.getAll(page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["cabins", sortBy, page - 1],
      queryFn: () => apiCabin.getAll(page - 1),
    });

  return { isPending, cabins, count };
};
