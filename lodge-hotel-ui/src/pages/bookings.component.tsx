import { BookingTable } from "@features/bookings";
import AddBooking from "@features/bookings/add-booking.component";
import { Heading } from "@ui/atoms";
import { Row } from "@ui/atoms/Row";

const Bookings = () => (
  <>
    <Row>
      <Heading as="h1">Bookings</Heading>
    </Row>
    <Row type="vertical">
      <BookingTable />
      <AddBooking />
    </Row>
  </>
);

export default Bookings;
