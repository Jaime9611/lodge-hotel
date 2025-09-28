import type { FC } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { BookingModel } from "@models";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { Heading } from "@ui/atoms";
import DashboardBox from "./dashboard-box.component";

interface SalesChartProps {
  bookings: BookingModel[] | undefined;
  numDays: number;
}

const SalesChart: FC<SalesChartProps> = ({ bookings, numDays }) => {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MM dd"),
      totalSales: bookings
        ?.filter((booking) =>
          isSameDay(date, new Date(booking?.createdAt ?? ""))
        )
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        ?.filter((booking) =>
          isSameDay(date, new Date(booking?.createdAt ?? ""))
        )
        .reduce((acc, _) => acc, 0),
    };
  });

  const colors = {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };

  return (
    <DashboardBox additionalStyles="col-span-full [&_.recharts-cartesian-grid-horizontal line]:stroke-gray-300 [&_.recharts-cartesian-grid-vertical line]:stroke-gray-300">
      <Heading as="h2">
        Sales from {format(allDates?.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates?.at(-1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default SalesChart;
