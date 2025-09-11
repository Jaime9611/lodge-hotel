import { type FC } from "react";

// import CreateCabinForm from "./create-cabin-form.component";
import { Button, Modal } from "@ui/atoms";

interface AddBookingProps {}

const AddBooking: FC<AddBookingProps> = () => {
  return (
    <Modal>
      <Modal.Open opens="booking-form">
        <Button>Add new booking</Button>
      </Modal.Open>
      <Modal.Window name="booking-form">
        <input type="text" />
        {/* <CreateCabinForm /> */}
      </Modal.Window>
    </Modal>
  );
};

export default AddBooking;
