import { useQuery } from "@tanstack/react-query";
import { apiUser } from "@services";

export const useUser = () => {
  const { data: user, isLoading: isPending } = useQuery({
    queryKey: ["user_data"],
    queryFn: () => apiUser.getData(),
  });

  return { isPending, user };
};
