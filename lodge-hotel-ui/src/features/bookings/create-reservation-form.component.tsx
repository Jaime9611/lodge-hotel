import type { FC } from "react";

import { differenceInDays } from "date-fns";
import { useReservation } from "@contexts";
import type {
  BookingModelForm,
  BookingModelFormResult,
  CabinModel,
} from "@models";
import { Button, Form } from "@ui/atoms";
import { useCreateBooking } from "./use-create-booking.hook";
import { useForm, type SubmitErrorHandler } from "react-hook-form";

interface ReservationFormProps {
  cabin: CabinModel;
  user: string;
}

const ReservationForm: FC<ReservationFormProps> = ({ cabin, user }) => {
  const { range, resetRange } = useReservation();
  const { maxCapacity, id, name } = cabin;
  const { createBooking, isCreating } = useCreateBooking();

  const startDate = range.from;
  const endDate = range.to;

  const bookingData: BookingModelFormResult = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    cabins: [cabin],
    numGuests: 0,
    guest: {
      fullName: user,
      email: "test@email.com",
      country: "Colombia",
      countryFlag: "https://flagcdn.com/co.svg",
      nationalId: "12324325235",
    }, // TODO: ADD GUESTS
  };

  const { register, handleSubmit, formState, reset } =
    useForm<BookingModelForm>({
      defaultValues: bookingData,
    });

  const { errors } = formState; // Form Errors

  const OnSubmit = (data: BookingModelForm) => {
    console.log(startDate);
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
      <div className="bg-primary-800 text-primary-300 text-white px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src="default-user.jpg"
            alt={user}
          />
          <p>{user}</p>
        </div>
      </div>

      <div className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            {...register("numGuests", {
              required: "This field is required",
            })}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
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
      </div>
    </Form>
  );
};

export default ReservationForm;
