import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiSettings } from "@services";
import type { SettingsModel } from "@models";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (settings: SettingsModel) =>
      apiSettings.updateSettings(settings),
    onSuccess: () => {
      toast.success("Setting succesfully updated.");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSettings };
};
