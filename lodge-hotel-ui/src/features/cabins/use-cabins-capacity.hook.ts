import { useSearchParams } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCabin } from "@services";

export const useCabinsByCapacity = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const capacityRange = { min: 2, max: 8 };

  // QUERY
  const capacity = searchParams.get("capacity") ?? "all";

  if (capacity == "small") {
    capacityRange.min = 2;
    capacityRange.max = 3;
  }
  if (capacity == "medium") {
    capacityRange.min = 4;
    capacityRange.max = 6;
  }
  if (capacity == "large") {
    capacityRange.min = 7;
    capacityRange.max = 8;
  }

  const { data, isLoading: isPending } = useQuery({
    queryKey: ["cabins-by-capacity", capacityRange.min, capacityRange.max],
    queryFn: () =>
      apiCabin.getAllByCapacity(capacityRange.min, capacityRange.max),
  });

  const cabins = data ?? [];

  return { isPending, cabins };
};
