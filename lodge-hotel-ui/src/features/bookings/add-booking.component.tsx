import { type FC } from "react";

// import CreateCabinForm from "./create-cabin-form.component";
import { Button, Modal } from "@ui/atoms";
import CreateBookingForm from "./create-booking-form.component";

interface AddBookingProps {}

const AddBooking: FC<AddBookingProps> = () => {
  return (
    <Modal>
      <Modal.Open opens="booking-form">
        <Button>Add new booking</Button>
      </Modal.Open>
      <Modal.Window name="booking-form">
        <CreateBookingForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddBooking;
