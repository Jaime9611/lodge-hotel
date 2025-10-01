import { apiBooking } from "@services";
import { useQuery } from "@tanstack/react-query";

export const useTodayActivity = () => {
  const { isPending: isLoading, data: activities } = useQuery({
    queryFn: () => apiBooking.getTodayStays(),
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
};
