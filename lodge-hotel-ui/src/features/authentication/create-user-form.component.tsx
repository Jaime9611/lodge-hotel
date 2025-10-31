import { type FC } from "react";

import { type SubmitErrorHandler, useForm } from "react-hook-form";

import { Button, Form, FormRowVertical, Input, Stack } from "@ui/atoms";
import type { UserModel } from "@models";
import { useCreateEmployee } from "./use-create-employee.hook";
import { useEditEmployee } from "./use-edit-employee.hook";

interface CreateUserFormProps {
  userToEdit?: UserModel;
  onCloseModal?: () => void;
}

const CreateUserForm: FC<CreateUserFormProps> = ({
  userToEdit = {} as UserModel,
  onCloseModal,
}) => {
  const { id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, watch, formState } = useForm<
    UserModel & { confirmPassword: string }
  >({
    defaultValues: isEditSession ? editValues : ({} as UserModel),
  });

  const { isCreating, createEmployee } = useCreateEmployee();
  const { isEditing, editEmployee } = useEditEmployee();

  const isWorking = isCreating || isEditing;

  const password = watch("password");

  const { errors } = formState; // Form Errors

  const onSubmit = (data: UserModel) => {
    if (isEditSession)
      editEmployee(
        { newUserData: { ...data }, id: editId },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset(); // If the mutation was successfull reset Form
          },
        }
      );
    else
      createEmployee(
        {
          newUserData: {
            ...data,
          },
        },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset(); // If the mutation was successfull reset Form
          },
        }
      );
  };

  const onError: SubmitErrorHandler<UserModel> = (errors) => {
    // Error Logic...
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRowVertical label="Username" error={errors?.username?.message}>
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
          {isEditSession ? "Edit account" : "Create account"}
        </Button>
      </Stack>
    </Form>
  );
};

export default CreateUserForm;
