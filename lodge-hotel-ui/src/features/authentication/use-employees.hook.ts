import { useQuery } from "@tanstack/react-query";
import { apiUser } from "@services";

export const useEmployees = () => {
  const { data: users, isLoading: isPending } = useQuery({
    queryKey: ["employees"],
    queryFn: () => apiUser.getEmployees(),
  });

  return { isPending, users };
};
