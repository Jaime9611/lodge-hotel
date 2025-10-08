import { type FC } from "react";

import { Button, Modal } from "@ui/atoms";

interface AddUserProps {}

const AddUser: FC<AddUserProps> = () => {
  return (
    <Modal>
      <Modal.Open opens="user-form">
        <Button>Add new user</Button>
      </Modal.Open>
      <Modal.Window name="user-form">
        <form>
          <input type="text" />
        </form>
      </Modal.Window>
    </Modal>
  );
};

export default AddUser;
