import { type FC } from "react";

import { Button, Modal } from "@ui/atoms";
import CreateuserForm from "./create-user-form.component";

interface AddUserProps {}

const AddUser: FC<AddUserProps> = () => {
  return (
    <Modal>
      <Modal.Open opens="user-form">
        <div className="self-end">
          <Button size="medium"> Add new employee</Button>
        </div>
      </Modal.Open>
      <Modal.Window name="user-form">
        <CreateuserForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddUser;
