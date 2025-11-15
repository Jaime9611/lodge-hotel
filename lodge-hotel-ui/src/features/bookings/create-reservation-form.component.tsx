import type { FC } from "react";

import { useReservation } from "@contexts";
import type {
  BookingModelForm,
  BookingModelFormResult,
  CabinModel,
  GuestModel,
} from "@models";
import {
  Button,
  CountrySelector,
  Form,
  FormRowVertical,
  Input,
  Select,
} from "@ui/atoms";
import { useCreateBooking } from "./use-create-booking.hook";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import type { CountryModel } from "@ui/atoms/CountrySelector/country-selector.component";

interface ReservationFormProps {
  cabin: CabinModel;
  user: string;
}

const ReservationForm: FC<ReservationFormProps> = ({ cabin }) => {
  const { range, resetRange } = useReservation();
  const { maxCapacity } = cabin;
  const { createBooking, isCreating } = useCreateBooking();

  const startDate = range?.from;
  const endDate = range?.to;

  const bookingData: BookingModelFormResult = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    cabins: [cabin],
    numGuests: 0,
    guest: {} as GuestModel,
  };

  const { register, handleSubmit, formState, reset, setValue, trigger } =
    useForm<BookingModelForm>({
      defaultValues: bookingData,
    });

  const handleCountryChange = (country: CountryModel) => {
    setValue("guest.country", country.label);
    setValue("guest.countryFlag", country.image);
    trigger("guest.country");
  };

  const { errors } = formState; // Form Errors

  const OnSubmit = (data: BookingModelForm) => {
    createBooking(
      {
        newBookingData: {
          ...data,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        } as BookingModelFormResult,
      },
      {
        onSuccess: () => {
          reset();
          resetRange();
        },
      }
    );
  };
  const onError: SubmitErrorHandler<BookingModelForm> = (errors) => {
    // Error Logic...
  };

  return (
    <Form onSubmit={handleSubmit(OnSubmit, onError)} type="regular">
      <div className="grid grid-cols-2 gap-4">
        <FormRowVertical
          label="Guest Name"
          error={errors?.guest?.fullName?.message}
        >
          <Input
            type="text"
            id="guest.fullName"
            disabled={isCreating}
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
            disabled={isCreating}
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
            disabled={isCreating}
            register={{
              ...register("guest.nationalId", {
                required: "This field is required",
              }),
            }}
          />
        </FormRowVertical>
      </div>

      <FormRowVertical
        label="How many Guests?"
        error={errors?.guest?.nationalId?.message}
      >
        <Select
          id="numGuests"
          register={register("numGuests", {
            required: "This field is required",
          })}
          options={Array.from({ length: maxCapacity }, (_, i) => i + 1).map(
            (x) => ({
              value: x,
              label: `${x} ${x === 1 ? "guest" : "guests"}`,
            })
          )}
        />
      </FormRowVertical>

      <div className="flex justify-end items-center gap-6">
        {!(startDate && endDate) ? (
          <p className="text-primary-300 text-base">Start by selecting dates</p>
        ) : (
          <Button
            type="submit"
            size="large"
            variation="primary"
            disabled={isCreating}
          >
            Reserve now
          </Button>
        )}
      </div>
    </Form>
  );
};

export default ReservationForm;
