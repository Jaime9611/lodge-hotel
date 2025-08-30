import { type FC } from "react";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { Table } from "@ui/molecules";
import { Modal } from "@ui/atoms/Modal";
import { ConfirmDelete } from "@ui/molecules";
import { IconStackMenu } from "@ui/atoms";
import type { BookingModel } from "@models";

import { formatCurrency, formatDistanceFromNow } from "@utils/helpers";
import { useDeleteBooking } from "./use-delete-booking.hook";
import Stacked from "@ui/atoms/Stacked/stacked.component";
import { Tag } from "@ui/atoms/Tag";
import { format, isToday } from "date-fns";

type BookingRowProps = {
  booking: BookingModel;
};

const BookingRow: FC<BookingRowProps> = ({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numGuests,
    totalPrice,
    status,
    guest: { fullName: guestName, email },
    cabin: { name: cabinName },
  },
}) => {
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const statusToTagName: { [key: string]: "blue" | "green" | "silver" } = {
    CHECKED_IN: "green",
    UNCONFIRMED: "blue",
    CHECKED_OUT: "silver",
  };

  return (
    <Table.Row>
      <div>{cabinName}</div>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
        {/* TODO: FORMAT THESE DATES */}
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status]}>{status.replace("_", " ")}</Tag>
      <div>{formatCurrency(123)}</div>

      <Modal>
        <IconStackMenu>
          <IconStackMenu.List>
            <IconStackMenu.Button icon={<HiEye />} />
            {status === "UNCONFIRMED" && (
              <IconStackMenu.Button icon={<HiArrowDownOnSquare />} />
            )}
            {status === "CHECKED_IN" && (
              <IconStackMenu.Button icon={<HiArrowUpOnSquare />} />
            )}

            <Modal.Open opens="delete">
              <IconStackMenu.Button icon={<HiTrash />} />
            </Modal.Open>
          </IconStackMenu.List>
        </IconStackMenu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default BookingRow;
