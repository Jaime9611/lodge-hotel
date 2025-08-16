import { type FC } from "react";

import { type SubmitErrorHandler, useForm } from "react-hook-form";

import { CabinModelForm, CabinModelFormResult } from "@models";
import { useCreateCabin } from "./use-create-cabin.hook";
import { useEditCabin } from "./use-edit-cabin.hook";
import { Button, Stack } from "@ui/atoms";

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
          ...data,
          image: image,
        } as CabinModelFormResult,
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
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount shoulb be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <Stack columns="24rem 1fr 1.2fr">
        {/* type is an HTML attribute! */}
        <Button type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </Stack>
    </Form>
  );
};

export default CreateCabinForm;
