import type { FC } from "react";

import { useBookedReservations } from "./use-booked-reservations.hook";
import ReservationForm from "./create-reservation-form.component";
import { useAuth } from "@contexts";
import { DateSelector, LoginMessage, Spinner } from "@ui/atoms";
import type { CabinModel } from "@models";
import { useSettings } from "@features/settings";

interface ReservationProps {
  cabin: CabinModel;
}

const Reservation: FC<ReservationProps> = ({ cabin }) => {
  const { user } = useAuth();
  const { bookedDates, isLoading: isLoadingReservations } =
    useBookedReservations();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  if (isLoadingReservations || isLoadingSettings) return <Spinner />;

  return (
    <div className="grid grid-cols-[1fr_1fr] border border-primary-500 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {user ? <ReservationForm cabin={cabin} user={user} /> : <LoginMessage />}
    </div>
  );
};

export default Reservation;
