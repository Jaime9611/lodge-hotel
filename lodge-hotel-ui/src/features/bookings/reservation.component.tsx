import type { FC } from "react";

import { useAuth } from "@contexts";
import { LoginMessage, Spinner } from "@ui/atoms";
import DateSelector from "@ui/atoms/DateSelector/date-selector.component";
import { useBookedReservations } from "./use-booked-reservations.hook";
import type { CabinModel } from "@models";
import ReservationForm from "./create-reservation-form.component";

interface ReservationProps {
  cabin: CabinModel;
}

const Reservation: FC<ReservationProps> = ({ cabin }) => {
  const { user } = useAuth();
  const { bookedDates, isLoading } = useBookedReservations();

  if (isLoading) return <Spinner />;

  console.log(bookedDates);

  return (
    <div className="grid grid-cols-[2fr_1fr] border border-primary-500 min-h-[400px]">
      <DateSelector
        // settings={settings}
        // TODO: SETTING FROM BACKEND
        settings={{ minBookingLength: 1, maxBookingLength: 4 }}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {user ? <ReservationForm cabin={cabin} user={user} /> : <LoginMessage />}
    </div>
  );
};

export default Reservation;
