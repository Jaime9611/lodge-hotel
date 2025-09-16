import type { FC, ReactNode } from "react";

import { type SubmitErrorHandler, useForm } from "react-hook-form";

import {
  Button,
  Form,
  FormRowVertical,
  Input,
  Stack,
  TextArea,
} from "@ui/atoms";
import type {
  BookingModelForm,
  BookingModelFormResult,
  BookingQuotationRequest,
  CabinModel,
  CabinRequest,
} from "@models";
import { useCreateBooking } from "./use-create-booking.hook";
import { useEditBooking } from "./use-edit-booking.hook";
import BookingCabinsSelect from "./booking-cabins-select.component";
import { formatCurrency } from "@utils/helpers";
import { useBookingQuotation } from "./use-booking-quotation";

// ------------ UI COMPONENT ------------

interface UIComponentProps {
  children: ReactNode;
}

const DivRowSelect: FC<UIComponentProps> = ({ children }) => (
  <div className="p-4 px-0">{children}</div>
);

const TotalLabel: FC<UIComponentProps> = ({ children }) => (
  <p className="text-2xl">{children}</p>
);

const TotalPrice: FC<UIComponentProps> = ({ children }) => (
  <span className="text-2xl font-semibold text-gray-400">{children}</span>
);

// ------------ MAIN COMPONENT ------------

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

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    setValue,
    trigger,
  } = useForm<BookingModelForm>({
    defaultValues: isEditSession ? editValues : ({} as BookingModelFormResult),
  });

  const { isCreating, createBooking } = useCreateBooking();

  const { isEditing, editBooking } = useEditBooking();

  const { isCalculatingTotal, calculateTotalPrice, totalPrice } =
    useBookingQuotation();

  const isWorking = isCreating || isEditing;

  const { errors } = formState; // Form Errors

  const handlePricesChange = () => {
    const data = getValues();

    if (Object.keys(data).length === 0) return;

    if (data.cabins?.length >= 1) {
      const cabinsBody: CabinRequest[] = data.cabins.map((cabin) => ({
        id: cabin.id,
        name: cabin.name,
      }));
      const bookingRequest: BookingQuotationRequest = {
        cabins: cabinsBody,
        startDate: "2025-08-19T08:00:00.123456",
        endDate: "2025-08-22T08:00:00.123456",
      };
      // TODO: ADD ACTUAL DATE PICKER LOGIC

      calculateTotalPrice(bookingRequest);
    }
  };

  const handleCabinChange = (cabins: CabinModel[]) => {
    setValue("cabins", cabins);
    trigger("cabins");
    handlePricesChange();
  };

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
      <DivRowSelect>
        <BookingCabinsSelect
          cabinsToEdit={getValues("cabins")}
          onUpdateCabins={handleCabinChange}
        />
      </DivRowSelect>

      {/* TODO:  Add total calculation */}
      <DivRowSelect>
        {isCalculatingTotal ? (
          <TotalLabel>
            Total Estimado: <small>...calculando</small>
          </TotalLabel>
        ) : (
          <TotalLabel>
            Total Estimado:{" "}
            <TotalPrice>{formatCurrency(totalPrice ?? 0)}</TotalPrice>
          </TotalLabel>
        )}
      </DivRowSelect>
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
