import { apiBooking } from "@services";
import { useQuery } from "@tanstack/react-query";

export const useTodayActivity = () => {
  const { isPending: isLoading, data } = useQuery({
    queryFn: () => apiBooking.getTodayStays(),
    queryKey: ["today-activity"],
  });

  const activities = data?.content ?? [];

  return { activities, isLoading };
};
