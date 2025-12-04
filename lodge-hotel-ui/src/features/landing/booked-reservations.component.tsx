import type { FC } from "react";

import type { CabinModel } from "@models";
import { DateSelector, Spinner } from "@ui/atoms";
import { useBookedReservations } from "@features/bookings";
import { useSettings } from "@features/settings";

interface BookedReservationsProps {
  cabin: CabinModel;
}

const BookedReservations: FC<BookedReservationsProps> = ({ cabin }) => {
  const { bookedDates, isLoading: isLoadingReservations } =
    useBookedReservations();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  if (isLoadingReservations || isLoadingSettings) return <Spinner />;

  return (
    <div className="w-full border border-primary-500 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
    </div>
  );
};

export default BookedReservations;
