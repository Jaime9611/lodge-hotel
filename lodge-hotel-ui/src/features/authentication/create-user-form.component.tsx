import { type FC } from "react";

import { type SubmitErrorHandler, useForm } from "react-hook-form";

import {
  Button,
  FileInput,
  Form,
  FormRowVertical,
  Image,
  Input,
  Stack,
} from "@ui/atoms";
import type { UserModel, UserModelFormResult } from "@models";
import { useCreateEmployee } from "./use-create-employee.hook";
import { useEditEmployee } from "./use-edit-employee.hook";

interface CreateUserFormProps {
  userToEdit?: UserModelFormResult;
  onCloseModal?: () => void;
  type?: "account" | "staff";
}

const CreateUserForm: FC<CreateUserFormProps> = ({
  userToEdit = {} as UserModelFormResult,
  onCloseModal,
  type = "staff",
}) => {
  const { id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, watch, formState } = useForm<
    UserModelFormResult & { confirmPassword: string }
  >({
    defaultValues: isEditSession ? editValues : ({} as UserModelFormResult),
  });

  const { isCreating, createEmployee } = useCreateEmployee();
  const { isEditing, editEmployee } = useEditEmployee();

  const isWorking = isCreating || isEditing;

  const password = watch("password");

  const { errors } = formState; // Form Errors

  const onSubmit = (data: UserModelFormResult) => {
    const image =
      typeof data.image === "string" ? data.image : (data.image[0] as File);

    if (isEditSession)
      editEmployee(
        {
          newUserData: {
            username: data.username,
            email: data.email,
            fullName: data.fullName,
            password: data.password,
            phone: data.phone,
            image,
          },
          id: editId,
        },
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
            username: data.username,
            email: data.email,
            fullName: data.fullName,
            password: data.password,
            phone: data.phone,
            image,
          } as UserModelFormResult,
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
    <div className="max-w-8xl">
      <Form onSubmit={handleSubmit(onSubmit, onError)} type="regular">
        <div
          className={
            type === "staff" ? "" : `grid grid-cols-[1fr_0.5fr] gap-20`
          }
        >
          <div className="grid grid-cols-2 gap-10">
            <FormRowVertical
              label="Full Name"
              error={errors?.fullName?.message}
            >
              <Input
                type="text"
                id="fullName"
                disabled={isWorking}
                register={{
                  ...register("fullName", {
                    required: "This field is required",
                  }),
                }}
              />
            </FormRowVertical>
            <FormRowVertical label="Email" error={errors?.email?.message}>
              <Input
                type="text"
                id="email"
                disabled={isWorking}
                register={{
                  ...register("email", { required: "This field is required" }),
                }}
              />
            </FormRowVertical>
            <FormRowVertical
              label="Phone Number"
              error={errors?.phone?.message}
            >
              <Input
                type="text"
                id="phone"
                disabled={isWorking}
                register={{
                  ...register("phone", { required: "This field is required" }),
                }}
              />
            </FormRowVertical>
            <FormRowVertical
              label="Username (This will be used for login)"
              error={errors?.username?.message}
            >
              <Input
                type="text"
                id="username"
                disabled={isWorking}
                register={{
                  ...register("username", {
                    required: "This field is required",
                  }),
                }}
              />
            </FormRowVertical>
            <FormRowVertical label="Password" error={errors?.password?.message}>
              <Input
                type="password"
                id="password"
                disabled={isWorking}
                register={{
                  ...register("password", {
                    required: isEditSession ? false : "This field is required",
                  }),
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
                disabled={isWorking || password === null}
                register={{
                  ...register("confirmPassword", {
                    required: isEditSession ? false : "This field is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                    disabled: password === null,
                  }),
                }}
              />
            </FormRowVertical>
          </div>
          {type === "staff" ? (
            <FormRowVertical
              label="Add a new image"
              error={errors?.image?.message}
            >
              <FileInput
                id="image"
                accept="image/*"
                register={{
                  ...register("image", {
                    required: isEditSession ? false : "This field is required",
                  }),
                }}
              />
            </FormRowVertical>
          ) : (
            <div className="bg-gray-50 border-2 border-solid border-gray-100 w-auto px-8 pt-6 pb-1 rounded-md">
              <div className="flex justify-center flex-col mb-12">
                <p className="self-center mb-2 font-semibold">Current Image</p>
                <Image
                  className="h-40 w-40 object-cover self-center rounded-full"
                  src={userToEdit.image as string}
                  alt="User image"
                  type="user"
                />
              </div>

              <FormRowVertical
                label="Add a new image"
                error={errors?.image?.message}
              >
                <FileInput
                  id="image"
                  accept="image/*"
                  register={{
                    ...register("image", {
                      required: isEditSession
                        ? false
                        : "This field is required",
                    }),
                  }}
                />
              </FormRowVertical>
            </div>
          )}
        </div>

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
    </div>
  );
};

export default CreateUserForm;
