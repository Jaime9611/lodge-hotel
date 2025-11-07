import type { FC, ReactNode } from "react";

import { type SubmitErrorHandler, useForm } from "react-hook-form";

import {
  Button,
  CountrySelector,
  DateRangeInput,
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
import type { CountryModel } from "@ui/atoms/CountrySelector/country-selector.component";
import { useCart } from "@contexts";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@utils/constants";

// ------------ UI COMPONENT ------------

interface UIComponentProps {
  children: ReactNode;
}

const DivRowSelect: FC<UIComponentProps> = ({ children }) => (
  <div className="p-4 px-0">{children}</div>
);

const TotalLabel: FC<UIComponentProps> = ({ children }) => (
  <p className="text-lg pl-2">{children}</p>
);

const TotalPrice: FC<UIComponentProps> = ({ children }) => (
  <span className="text-xl font-semibold text-gray-400">{children}</span>
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

  const { cartItems } = useCart();

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
        startDate: data.startDate,
        endDate: data.endDate,
      };

      calculateTotalPrice(bookingRequest);
    }
  };

  const handleDateChange = (dateRange: { startDate: Date; endDate: Date }) => {
    setValue("startDate", dateRange.startDate.toISOString());
    setValue("endDate", dateRange.endDate.toISOString());
    trigger("startDate");
    trigger("endDate");
    handlePricesChange();
  };

  const handleCountryChange = (country: CountryModel) => {
    setValue("guest.country", country.label);
    setValue("guest.countryFlag", country.image);
    trigger("guest");
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

  const hasItemsOnCart = cartItems.length > 0;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {!hasItemsOnCart && (
        <div className="w-full bg-orange-400 text-white p-3">
          You don't have cabins selected. You can add cabins in{" "}
          <span>
            <NavLink
              to={`/${ROUTES.cabins}`}
              replace={true}
              className="underline font-bold"
            >
              this page.
            </NavLink>
          </span>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <FormRowVertical
          label="Guest Name"
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
        <FormRowVertical
          label="Guest Email"
          error={errors?.guest?.email?.message}
        >
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
          label="Guest Country"
          error={errors?.guest?.country?.message}
        >
          <CountrySelector onUpdate={handleCountryChange} />
        </FormRowVertical>
        <FormRowVertical
          label="Guest NationalID"
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
      <FormRowVertical
        label="Reservation Date"
        error={errors?.startDate?.message || errors?.endDate?.message}
      >
        <DateRangeInput
          initalRange={{
            startDate: getValues("startDate"),
            endDate: getValues("endDate"),
          }}
          onUpdate={handleDateChange}
        />
      </FormRowVertical>
      <DivRowSelect>
        <div>
          <ul>
            {cartItems.map((item) => (
              <li>{item.name}</li>
            ))}
          </ul>
        </div>
      </DivRowSelect>
      <DivRowSelect>
        {isCalculatingTotal ? (
          <TotalLabel>
            Total: <small>...calculating</small>
          </TotalLabel>
        ) : (
          <TotalLabel>
            Total: <TotalPrice>{formatCurrency(totalPrice ?? 0)}</TotalPrice>
          </TotalLabel>
        )}
      </DivRowSelect>
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
