import type { FC, ReactNode } from "react";

import {
  HiOutlineCalendarDays,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import type { BookingModel } from "@models";
import { format, isToday } from "date-fns";

import { formatCurrency, formatDistanceFromNow } from "@utils/helpers";
import { DataItem } from "@ui/atoms";
import Flag from "@ui/atoms/Flag/flag.component";
import { BookedCabinDetail } from "@features/landing";

// ---------------- BOX COMPONENT ----------------

interface DataBoxProps {
  children: ReactNode;
}

const DataBox: FC<DataBoxProps> = ({ children }) => (
  <div className="bg-white border border-solid border-gray-100 rounded-md ">
    {children}
  </div>
);

// ---------------- HEADER COMPONENT ----------------

interface DataHeaderProps {
  children: ReactNode;
}

const DataHeader: FC<DataHeaderProps> = ({ children }) => (
  <div className="bg-primary-500 py-8 px-16 text-[#e0e7ff] text-2xl font-medium flex items-center justify-between [&_svg]:h-12 [&_svg]:w-12 [&_div:first-child]:flex [&_div:first-child]:items-center [&_div:first-child]:gap-6 [&_div:first-child]:font-semibold [&_div:first-child]:text-2xl [&_span]:text-3xl [&_span]:ml-1">
    {children}
  </div>
);

// ---------------- GUEST COMPONENT ----------------

interface DataGuestProps {
  children: ReactNode;
}

const DataGuest: FC<DataGuestProps> = ({ children }) => (
  <div className="flex items-center gap-5 mb-6 text-gray-500 [&_p:first-of-type]:font-medium [&_p:first-of-type]:text-gray-700">
    {children}
  </div>
);

// ---------------- PRICE COMPONENT ----------------

const paidStyles = "bg-green-100 text-green-700";
const normalStyles = "bg-yellow-100 text-yellow-700";

interface PriceProps {
  isPaid: boolean;
  children: ReactNode;
}

const DataPrice: FC<PriceProps> = ({ isPaid, children }) => {
  const styles = isPaid ? paidStyles : normalStyles;

  return (
    <div
      className={`flex items-center justify-between py-6 px-12 rounded-sm mt-9 ${styles}
        [p:last-child]:uppercase [p:last-child]:text-xl [p:last-child]:font-semibold\
        [&_svg]:h-8 [&_svg]:w-8`}
    >
      {children}
    </div>
  );
};

interface BookingDataBoxProps {
  booking: BookingModel;
}

// ---------------- MAIN COMPONENTS ----------------

const BookingDataBox: FC<BookingDataBoxProps> = ({ booking }) => {
  if (booking === undefined || booking.guest === undefined) return null;

  const {
    createdAt,
    startDate,
    endDate,
    numGuests,
    totalPrice,
    isPaid,
    guest: { fullName: guestName, email, country, countryFlag, nationalId },
    id,
  } = booking;

  return (
    <DataBox>
      <DataHeader>
        <div>
          <HiOutlineCalendarDays />
          <p>
            <span>BK-{id}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </DataHeader>

      <div className="pt-12 px-16 pb-5">
        <DataGuest>
          {true && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID: {nationalId}</p>
        </DataGuest>
        <div className="pl-12 pt-4">
          {booking.cabins.map((cabin) => (
            <DataItem icon={<HiOutlineHomeModern />} label={cabin.name}>
              <span>&bull;</span>
              <p>Max capacity: {cabin.maxCapacity}</p>
              <span>&bull;</span>

              {cabin.discount > 0 ? (
                <span>${cabin.regularPrice - cabin.discount}</span>
              ) : (
                <p>Price ${cabin.regularPrice}</p>
              )}
            </DataItem>
          ))}
        </div>

        <DataPrice isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </DataPrice>
      </div>

      <div className="py-6 px-16 text-2xl text-gray-500 text-right">
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
      </div>
    </DataBox>
  );
};

export default BookingDataBox;
