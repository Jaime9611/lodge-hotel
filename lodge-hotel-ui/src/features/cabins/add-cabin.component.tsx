import { type FC } from "react";

import CreateCabinForm from "./create-cabin-form.component";
import { Button, Modal } from "@ui/atoms";

interface AddCabinProps {}

const AddCabin: FC<AddCabinProps> = () => {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;
