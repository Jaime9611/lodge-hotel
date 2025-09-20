import { type FC } from "react";

import { type SubmitErrorHandler, useForm } from "react-hook-form";

import {
  Button,
  FileInput,
  Form,
  FormRowVertical,
  Input,
  Stack,
  TextArea,
} from "@ui/atoms";
import type { CabinModelForm, CabinModelFormResult } from "@models";
import { useCreateCabin } from "./use-create-cabin.hook";
import { useEditCabin } from "./use-edit-cabin.hook";

interface CreateCabinFormProps {
  cabinToEdit?: CabinModelFormResult;
  onCloseModal?: () => void;
}

const CreateCabinForm: FC<CreateCabinFormProps> = ({
  cabinToEdit = {} as CabinModelFormResult,
  onCloseModal,
}) => {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinModelForm>({
      defaultValues: isEditSession ? editValues : ({} as CabinModelFormResult),
    });

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const { errors } = formState; // Form Errors

  const onSubmit = (data: CabinModelForm) => {
    console.log(data);
    const image =
      typeof data.image === "string" ? data.image : (data.image[0] as File);
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset(); // If the mutation was successfull reset Form
          },
        }
      );
    else
      createCabin(
        {
          newCabinData: {
            ...data,
            image: image,
          } as CabinModelFormResult,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset(); // If the mutation was successfull reset Form
          },
        }
      );
  };

  const onError: SubmitErrorHandler<CabinModelForm> = (errors) => {
    // Error Logic...
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRowVertical label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          register={{
            ...register("name", { required: "This field is required" }),
          }}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Maximum Capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          register={{
            ...register("maxCapacity", {
              required: "This field is required",
              min: { value: 1, message: "Capacity should be at least 1" },
            }),
          }}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          register={{
            ...register("regularPrice", {
              required: "This field is required",
              min: { value: 1, message: "Price should be at least 1" },
            }),
          }}
        />
      </FormRowVertical>
      <FormRowVertical label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          register={{
            ...register("discount", {
              required: "This field is required",
              validate: (value) =>
                +value <= +getValues().regularPrice ||
                "Discount should be less than regular price",
            }),
          }}
        />
      </FormRowVertical>
      <FormRowVertical label="Description" error={errors?.name?.message}>
        <TextArea
          id="description"
          disabled={isWorking}
          defaultValue=""
          register={{
            ...register("description", { required: "This field is required" }),
          }}
        />
      </FormRowVertical>

      <FormRowVertical label="Cabin photo" error={errors?.image?.message}>
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

      <Stack columns="24rem 1fr 1.2fr">
        {/* type is an HTML attribute! */}
        <Button
          type="reset"
          variation="secondary"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" variation="primary" disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </Stack>
    </Form>
  );
};

export default CreateCabinForm;
