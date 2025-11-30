import type { FC } from "react";

import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "@utils/helpers";
import type { BookingModel } from "@models";
import Stat from "./stat.component";

interface StatsProps {
  bookings: BookingModel[] | undefined;
  confirmedStays: BookingModel[] | undefined;
  numDays: number;
  cabinCount: number | undefined;
}

const Stats: FC<StatsProps> = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) => {
  // 1.
  const numBookings = bookings?.length ?? 0;

  // 2.
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkins = confirmedStays?.length ?? 0;

  // 4.
  const occupation =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales ?? 0)}
      />
      <Stat
        title="Check ins"
        color="slate"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
};

export default Stats;
