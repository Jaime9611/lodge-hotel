import { type FC } from "react";

import { type SubmitErrorHandler, useForm } from "react-hook-form";

import { Button, Form, FormRowVertical, Input, Stack } from "@ui/atoms";
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
    // const image =
    //   typeof data.image === "string" ? data.image : (data.image[0] as File);
    const image = "";
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
      {/* // TODO: CHANGE TO REGULAR PRICE */}
      <FormRowVertical label="Regular price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          register={{
            ...register("price", {
              required: "This field is required",
              min: { value: 1, message: "Price should be at least 1" },
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
