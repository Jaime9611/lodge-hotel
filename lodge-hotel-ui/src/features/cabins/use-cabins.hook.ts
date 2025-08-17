import { useSearchParams } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCabin } from "@services";

export const useCabins = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data, isLoading: isPending } = useQuery({
    queryKey: ["cabins", page],
    queryFn: () => apiCabin.getAll(page),
  });

  const { content: cabins, totalPages } = data ?? {};

  // PRE-FETCHING
  if (page < (totalPages ?? 0))
    queryClient.prefetchQuery({
      queryKey: ["supplies", page + 1],
      queryFn: () => apiCabin.getAll(page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["supplies", page - 1],
      queryFn: () => apiCabin.getAll(page - 1),
    });

  return { isPending, cabins, totalPages };
};
