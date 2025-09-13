import { type FC } from "react";

import { type SubmitErrorHandler, useForm } from "react-hook-form";

import {
  Button,
  Form,
  FormRowVertical,
  Input,
  Stack,
  TextArea,
} from "@ui/atoms";
import type { BookingModelForm, BookingModelFormResult } from "@models";
import { useCreateBooking } from "./use-create-booking.hook";
import { useEditBooking } from "./use-edit-booking.hook";

interface CreateBookingFormProps {
  bookingToEdit?: BookingModelFormResult;
  onCloseModal?: () => void;
}

const CreateBookingForm: FC<CreateBookingFormProps> = ({
  bookingToEdit = {} as BookingModelFormResult,
  onCloseModal,
}) => {
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<BookingModelForm>({
      defaultValues: isEditSession
        ? editValues
        : ({} as BookingModelFormResult),
    });

  const { isCreating, createBooking } = useCreateBooking();

  const { isEditing, editBooking } = useEditBooking();

  const isWorking = isCreating || isEditing;

  const { errors } = formState; // Form Errors

  const onSubmit = (data: BookingModelForm) => {
    if (isEditSession)
      editBooking(
        { newBookingData: { ...data }, id: editId },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        }
      );
    else
      createBooking(
        {
          newBookingData: {
            ...data,
          } as BookingModelFormResult,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
            reset();
          },
        }
      );
  };

  const onError: SubmitErrorHandler<BookingModelForm> = (errors) => {
    // Error Logic...
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRowVertical
        label="Number of Guests"
        error={errors?.numGuests?.message}
      >
        <Input
          type="number"
          id="numGuests"
          disabled={isWorking}
          register={{
            ...register("numGuests", {
              required: "This field is required",
              min: { value: 1, message: "Number should be at least 1" },
            }),
          }}
        />
      </FormRowVertical>
      <FormRowVertical label="Guest name" error={errors?.guest?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          register={{
            ...register("guest", { required: "This field is required" }),
          }}
        />
      </FormRowVertical>
      <FormRowVertical label="Cabins" error={errors?.cabin?.message}>
        <Input
          type="text"
          id="cabin"
          disabled={isWorking}
          register={{
            ...register("cabin", {
              required: "This field is required",
            }),
          }}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Include Breakfast"
        error={errors?.hasBreakfast?.message}
      >
        <Input
          type="text"
          id="hasBreakfast"
          disabled={isWorking}
          register={{
            ...register("hasBreakfast"),
          }}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Observations"
        error={errors?.observations?.message}
      >
        <TextArea
          id="observations"
          disabled={isWorking}
          defaultValue=""
          register={{
            ...register("observations", { required: "This field is required" }),
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
          {isEditSession ? "Edit booking" : "Create booking"}
        </Button>
      </Stack>
    </Form>
  );
};

export default CreateBookingForm;
