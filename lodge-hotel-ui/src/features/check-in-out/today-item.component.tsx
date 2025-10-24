import type { BookingModel } from "@models";
import { Flag, Tag } from "@ui/atoms";
import type { FC } from "react";

import { Link } from "react-router-dom";
import CheckoutButton from "./checkout-button.component";
import { ROUTES } from "@utils/constants";

interface TodayItemProps {
  activity: BookingModel;
}

const TodayItem: FC<TodayItemProps> = ({ activity }) => {
  const { id, status, guest, numNights } = activity ?? {};

  return (
    <li className="grid grid-cols-[9rem_2rem_1fr_5rem_9rem] gap-4 items-center text-lg px-3 border-b border-solid border-b-gray-100 [&:first-child]:border-t [&:first-child]:border-t-gray-100">
      {status === "UNCONFIRMED" && <Tag type="green">Arriving</Tag>}
      {status === "CHECKED_IN" && <Tag type="blue">Departing</Tag>}

      <Flag src={guest.countryFlag} alt={guest.country} />
      <div className="font-medium">{guest.fullName}</div>
      <div>{numNights} nights</div>

      {status === "UNCONFIRMED" && (
        <Link
          className="border-none rounded-md shadow-xs hover:cursor-pointer text-large px-1 py-2 font-semibold text-center text-gray-50 bg-primary hover:bg-primary-700"
          to={`${ROUTES.booking_checkin_path}/${id}`}
        >
          Check in
        </Link>
      )}
      {status === "CHECKED_IN" && <CheckoutButton bookingId={id} />}
    </li>
  );
};

export default TodayItem;
