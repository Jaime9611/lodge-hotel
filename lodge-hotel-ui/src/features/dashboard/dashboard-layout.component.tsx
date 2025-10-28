import type { FC } from "react";

import { Spinner } from "@ui/atoms";
import { useCabins } from "@features/cabins";
import Stats from "./stats.component";
import { useBookings } from "@features/bookings";
import DurationChart from "./duration-chart.component";
import SalesChart from "./sales-chart.component";
import { TodayActivity } from "@features/check-in-out";
import { useRecentBookings } from "./use-recent-bookings.hook";
import { useRecentStays } from "./use-recent-stays.hook";

interface DashboardLayoutProps {}

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, numDays, isLoading: isLoading2 } = useRecentStays();
  const { cabins, isPending: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_34rem_auto] gap-9">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins?.length}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
};

export default DashboardLayout;
