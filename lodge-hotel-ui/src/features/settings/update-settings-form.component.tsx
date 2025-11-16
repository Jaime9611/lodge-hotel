import type { FocusEvent } from "react";

import { useSettings } from "./use-settings.hook";
import { useUpdateSetting } from "./use-update-settings.hook";
import {
  Button,
  FileInput,
  Form,
  FormRowVertical,
  Input,
  Spinner,
} from "@ui/atoms";
import type {
  SettingsModel,
  SettingsModelForm,
  SettingsModelFormResult,
} from "@models";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@utils/constants";

const UpdateSettingsForm = () => {
  const { isLoading, settings } = useSettings();
  const navigate = useNavigate();

  const { isUpdating, updateSettings } = useUpdateSetting();

  const { register, handleSubmit, reset, watch, formState } = useForm<
    SettingsModel | SettingsModelFormResult
  >({
    defaultValues: settings ?? ({} as SettingsModelFormResult),
  });

  if (isLoading) return <Spinner />;

  const minValue = watch("minBookingLength");

  const { errors } = formState;

  const onSubmit = (data: SettingsModel | SettingsModelFormResult) => {
    const image =
      typeof data.logoImage === "string"
        ? data.logoImage
        : ((data as unknown as SettingsModelForm).logoImage[0] as File);

    updateSettings(
      { ...data, logoImage: image },
      {
        onSuccess: () => {
          reset();
          navigate(ROUTES.dashboard_path);
        },
      }
    );
  };

  const onError: SubmitErrorHandler<SettingsModelFormResult> = (errors) => {
    // Error Logic...
  };

  return (
    <div className="max-w-8xl">
      <Form onSubmit={handleSubmit(onSubmit, onError)} type="regular">
        <div className="grid grid-cols-2 gap-20">
          <div>
            <FormRowVertical
              label="Minimum nights/booking"
              error={errors?.minBookingLength?.message}
            >
              <Input
                type="number"
                id="minBookingLength"
                register={{
                  ...register("minBookingLength", {
                    validate: (value) =>
                      value >= 1 || "Min value has to be at least 1",
                  }),
                }}
              />
            </FormRowVertical>
            <FormRowVertical
              label="Maximum nights/booking"
              error={errors?.maxBookingLength?.message}
            >
              <Input
                type="number"
                id="maxBookingLength"
                disabled={isUpdating}
                register={{
                  ...register("maxBookingLength", {
                    validate: (value) =>
                      value > minValue ||
                      "Max value has to be greather than min value",
                  }),
                }}
              />
            </FormRowVertical>
          </div>
          <div className="bg-gray-50 border-2 border-solid border-gray-100 w-auto px-8 py-6 rounded-md">
            <div className="flex justify-center">
              <img
                className="h-36 w-auto text-center"
                src={settings.logoImage}
              />
            </div>

            <FormRowVertical label="Select new Logo Image">
              <FileInput
                id="logoImage"
                accept="image/jpg"
                register={{
                  ...register("logoImage"),
                }}
              />
            </FormRowVertical>
          </div>
        </div>
        <div className="w-8xl flex justify-end mt-4 gap-4">
          <Button type="reset" variation="secondary">
            Cancel
          </Button>
          <Button type="submit" variation="primary" disabled={isUpdating}>
            Update Settings
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateSettingsForm;
