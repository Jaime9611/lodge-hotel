import type { FC } from "react";

import type { CabinModel } from "@models";
import { DateSelector, Spinner } from "@ui/atoms";
import { useBookedReservations } from "@features/bookings";

interface BookedReservationsProps {
  cabin: CabinModel;
}

const BookedReservations: FC<BookedReservationsProps> = ({ cabin }) => {
  const { bookedDates, isLoading: isLoadingReservations } =
    useBookedReservations();

  if (isLoadingReservations) return <Spinner />;

  return (
    <div className="w-full border border-primary-500 min-h-[400px]">
      <DateSelector
        settings={{ minBookingLength: 1, maxBookingLength: 4, logoImage: "" }}
        bookedDates={bookedDates}
        cabin={cabin}
      />
    </div>
  );
};

export default BookedReservations;
