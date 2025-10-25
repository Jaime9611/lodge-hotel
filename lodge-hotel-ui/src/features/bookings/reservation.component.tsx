import type { FC } from "react";

import { useAuth } from "@contexts";
import { LoginMessage } from "@ui/atoms";
import DateSelector from "@ui/atoms/DateSelector/date-selector.component";
import type { CabinModel } from "@models";
import { addDays, eachDayOfInterval } from "date-fns";

const booked = [1]
  .map((_) => {
    return eachDayOfInterval({
      start: new Date(),
      end: addDays(new Date(), 3),
    });
  })
  .flat();

interface ReservationProps {
  cabin: CabinModel;
}

const Reservation: FC<ReservationProps> = ({ cabin }) => {
  const { user } = useAuth();

  return (
    <div className="grid grid-cols-[1.5fr_1fr] border border-primary-500 min-h-[400px]">
      <DateSelector
        // settings={settings}
        // bookedDates={bookedDates}
        settings={{ minBookingLength: 1, maxBookingLength: 4 }}
        bookedDates={booked}
        cabin={cabin}
      />
      {user ? (
        // <ReservationForm cabin={cabin} user={user} />
        <div className="">Rerservation Form</div>
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
