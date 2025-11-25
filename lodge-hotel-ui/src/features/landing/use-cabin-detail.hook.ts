import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { apiCabin } from "@services";

export const useCabinDetail = () => {
  const { cabinId } = useParams() as { cabinId: string };
  const {
    isPending: isLoading,
    error,
    data: cabin,
  } = useQuery({
    queryKey: ["cabin-detail", cabinId],
    queryFn: () => apiCabin.getCabinDetail(Number(cabinId)),
  });

  return { isLoading, error, cabin };
};
