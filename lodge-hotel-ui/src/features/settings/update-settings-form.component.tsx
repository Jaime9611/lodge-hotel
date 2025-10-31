import type { SettingsModel } from "@models";
import { Form, FormRowVertical, Input, Spinner } from "@ui/atoms";

import type { FocusEvent } from "react";

const UpdateSettingsForm = () => {
  //   const { isLoading, settings = {} } = useSettings();

  //   const { isUpdating, updateSettings } = useUpdateSetting();

  //   const { minBookingLength, maxBookingLength } = settings as SettingsModel;
  const minBookingLength = 1;
  const maxBookingLength = 4;

  if (false) return <Spinner />;

  const handleUpdate = (e: FocusEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;

    if (!value) return;
    // updateSettings({ [field]: value });
  };

  return (
    <Form onSubmit={() => undefined} type="regular">
      <FormRowVertical label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={false}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRowVertical>
      <FormRowVertical label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={false}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRowVertical>
    </Form>
  );
};

export default UpdateSettingsForm;
