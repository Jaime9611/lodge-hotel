import type { FC } from "react";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import { useEffect, useRef, useState } from "react";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

interface RangeObject {
  startDate: Date;
  endDate: Date;
  key?: string;
}

interface DateRangeInputProps {
  initalRange: { startDate: string; endDate: string };
  onUpdate: (dateRange: RangeObject) => void;
}

const DateRangeInput: FC<DateRangeInputProps> = ({ initalRange, onUpdate }) => {
  const [range, setRange] = useState<RangeObject[]>([
    {
      startDate: initalRange.startDate
        ? new Date(initalRange.startDate)
        : new Date(),
      endDate: initalRange.endDate
        ? new Date(initalRange.endDate)
        : addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  useEffect(() => {
    onUpdate(range[0]);
  }, [range[0]]);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap">
      <input
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(
          range[0].endDate,
          "MM/dd/yyyy"
        )}`}
        readOnly
        className="inputBox relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne} className="absolute">
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
};
export default DateRangeInput;
