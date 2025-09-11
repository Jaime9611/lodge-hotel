import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { apiCabin } from "@services";

export const useCabin = () => {
  const { cabinId } = useParams() as { cabinId: string };
  const {
    isPending: isLoading,
    error,
    data: cabin,
  } = useQuery({
    queryKey: ["cabin", cabinId],
    queryFn: () => apiCabin.getCabin(Number(cabinId)),
    retry: false,
  });

  return { isLoading, error, cabin };
};
