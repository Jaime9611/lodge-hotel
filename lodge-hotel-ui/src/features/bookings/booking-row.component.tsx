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

import {
  formatCurrency,
  formatDistanceFromNow,
  statusToTagName,
} from "@utils/helpers";
import { useDeleteBooking } from "./use-delete-booking.hook";
import Stacked from "@ui/atoms/Stacked/stacked.component";
import { Tag } from "@ui/atoms/Tag";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@utils/constants";

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
  },
}) => {
  const navigate = useNavigate();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  return (
    <Table.Row>
      <div>BK-{bookingId}</div>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>
      <Stacked>
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
      <div>{formatCurrency(totalPrice)}</div>

      <Modal>
        <IconStackMenu>
          <IconStackMenu.List>
            <IconStackMenu.Button
              onClick={() => navigate(`${ROUTES.bookings_path}/${bookingId}`)}
              icon={<HiEye />}
              displayText="See details"
            />
            {status === "UNCONFIRMED" && (
              <IconStackMenu.Button
                icon={<HiArrowDownOnSquare />}
                displayText="Check in"
              />
            )}
            {status === "CHECKED_IN" && (
              <IconStackMenu.Button
                icon={<HiArrowUpOnSquare />}
                displayText="Check out"
              />
            )}

            <Modal.Open opens="delete">
              <IconStackMenu.Button icon={<HiTrash />} displayText="Delete" />
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
