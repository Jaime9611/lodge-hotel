import type { FC } from "react";

import { Spinner } from "@ui/atoms";
import { useCabins } from "@features/cabins";
import Stats from "./stats.component";
import { useBookings } from "@features/bookings";
import DurationChart from "./duration-chart.component";
import SalesChart from "./sales-chart.component";

interface DashboardLayoutProps {}

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  // TODO: USE ACTUAL BOOKINGS QUERY
  const { bookings, isPending: isLoading1 } = useBookings();
  const { cabins, isPending: isLoading3 } = useCabins();

  if (isLoading1 || isLoading3) return <Spinner />;

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_34rem_auto] gap-9">
      {/* TODO: ADD CONFIRMEDSTAYS  */}
      <Stats
        bookings={bookings}
        confirmedStays={bookings}
        cabinCount={cabins?.length}
        numDays={10}
      />
      <div className="">TODAY</div>
      <DurationChart confirmedStays={bookings} />
      <SalesChart bookings={bookings} numDays={7} />
    </div>
  );
};

export default DashboardLayout;
