import { useSearchParams } from "react-router-dom";

import { Table } from "@ui/molecules";
import { Empty, Pagination, Spinner } from "@ui/atoms";
import { useBookings } from "./use-bookings.hook";
import BookingRow from "./booking-row.component";

const BookingTable = () => {
  const { isPending, bookings, count } = useBookings();
  // const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  if (bookings === undefined || !bookings.length)
    return <Empty resource="bookings" />;

  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>ID</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => (
          <BookingRow
            key={`booking-table-row-${booking.id}`}
            booking={booking}
          />
        )}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
};

export default BookingTable;
