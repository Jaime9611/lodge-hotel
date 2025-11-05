import { useQuery } from "@tanstack/react-query";

import { apiSettings } from "@services";
import type { SettingsModel } from "@models";

export const useSettings = () => {
  const {
    isPending: isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () => apiSettings.getSettings(),
  });

  const settings = data ?? ({} as SettingsModel);

  return { isLoading, error, settings };
};
