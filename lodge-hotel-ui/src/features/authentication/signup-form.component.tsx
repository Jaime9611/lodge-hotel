import { type FC } from "react";

import { type SubmitErrorHandler, useForm } from "react-hook-form";

import {
  Button,
  CountrySelector,
  Form,
  FormRowVertical,
  Input,
  Stack,
} from "@ui/atoms";
import type { UserGuestModel } from "@models";
import { useCreateEmployee } from "./use-create-employee.hook";
import { useEditEmployee } from "./use-edit-employee.hook";
import type { CountryModel } from "@ui/atoms/CountrySelector/country-selector.component";
import { useCreateGuest } from "./use-create-guest.hook";

interface CreateGuestFormProps {
  userToEdit?: UserGuestModel;
  onCloseModal?: () => void;
}

const CreateGuestForm: FC<CreateGuestFormProps> = ({
  userToEdit = {} as UserGuestModel,
  onCloseModal,
}) => {
  const { id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, watch, formState, setValue, trigger } =
    useForm<UserGuestModel & { confirmPassword: string }>({
      defaultValues: isEditSession ? editValues : ({} as UserGuestModel),
    });

  const { isCreating, createGuest } = useCreateGuest();
  const { isEditing, editEmployee } = useEditEmployee();

  const isWorking = isCreating || isEditing;

  const password = watch("password");

  const { errors } = formState; // Form Errors

  const handleCountryChange = (country: CountryModel) => {
    setValue("guest.country", country.label);
    setValue("guest.countryFlag", country.image);
    trigger("guest");
  };

  const onSubmit = (data: UserGuestModel) => {
    if (isEditSession)
      //   editEmployee(
      //     { newUserData: { ...data }, id: editId },
      //     {
      //       onSuccess: () => {
      //         onCloseModal?.();
      //         reset();
      //       },
      //     }
      //   );
      console.log("Editing called");
    else
      createGuest(
        {
          newUserData: {
            ...data,
          },
        },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        }
      );
  };

  const onError: SubmitErrorHandler<UserGuestModel> = (errors) => {
    // Error Logic...
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="grid grid-cols-2 gap-4">
        <FormRowVertical
          label="Full Name"
          error={errors?.guest?.fullName?.message}
        >
          <Input
            type="text"
            id="guest.fullName"
            disabled={isWorking}
            register={{
              ...register("guest.fullName", {
                required: "This field is required",
              }),
            }}
          />
        </FormRowVertical>
        <FormRowVertical label="Email" error={errors?.guest?.email?.message}>
          <Input
            type="text"
            id="email"
            disabled={isWorking}
            register={{
              ...register("guest.email", {
                required: "This field is required",
              }),
            }}
          />
        </FormRowVertical>
        <FormRowVertical
          label="Country"
          error={errors?.guest?.country?.message}
        >
          <CountrySelector onUpdate={handleCountryChange} />
        </FormRowVertical>
        <FormRowVertical
          label="NationalID"
          error={errors?.guest?.nationalId?.message}
        >
          <Input
            type="text"
            id="nationalID"
            disabled={isWorking}
            register={{
              ...register("guest.nationalId", {
                required: "This field is required",
              }),
            }}
          />
        </FormRowVertical>
      </div>
      <FormRowVertical
        label="Username - (This will be used for login)"
        error={errors?.username?.message}
      >
        <Input
          type="text"
          id="username"
          disabled={isWorking}
          register={{
            ...register("username", { required: "This field is required" }),
          }}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isWorking}
          register={{
            ...register("password", { required: "This field is required" }),
          }}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Confirm Password"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          id="confirmPassword"
          disabled={isWorking}
          register={{
            ...register("confirmPassword", {
              required: "Please confirm your password.",
              validate: (value) =>
                value === password || "Passwords do not match",
            }),
          }}
        />
      </FormRowVertical>

      <Stack columns="24rem 1fr 1.2fr">
        <Button
          type="reset"
          variation="secondary"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" variation="primary" disabled={isWorking}>
          {isEditSession ? "Edit Account" : "Create Account"}
        </Button>
      </Stack>
    </Form>
  );
};

export default CreateGuestForm;
