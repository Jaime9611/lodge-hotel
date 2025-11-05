import type { FocusEvent } from "react";

import { useSettings } from "./use-settings.hook";
import { useUpdateSetting } from "./use-update-settings.hook";
import { Form, FormRowVertical, Input, Spinner } from "@ui/atoms";
import type { SettingsModel } from "@models";

const UpdateSettingsForm = () => {
  const { isLoading, settings = {} } = useSettings();

  const { isUpdating, updateSettings } = useUpdateSetting();

  const { minBookingLength, maxBookingLength } = settings as SettingsModel;

  if (isLoading) return <Spinner />;

  const handleUpdate = (e: FocusEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;

    if (!value) return;
    updateSettings({ ...settings, [field]: value } as SettingsModel);
  };

  return (
    <Form onSubmit={() => undefined} type="regular">
      <FormRowVertical label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRowVertical>
      <FormRowVertical label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRowVertical>
    </Form>
  );
};

export default UpdateSettingsForm;
