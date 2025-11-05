import { Avatar, Button, Heading, Modal } from "@ui/atoms";
import type { FC } from "react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi2";
import CreateUserForm from "./create-user-form.component";
import { ConfirmDelete } from "@ui/molecules";
import type { UserModel } from "@models";

interface UserCardProps {
  onDelete: () => void;
  user: UserModel;
  isDeleting: boolean;
}

const UserCard: FC<UserCardProps> = ({ onDelete, user, isDeleting }) => {
  return (
    <div key={`user-card-${user.id}`}>
      <div className="bg-white border border-solid border-gray-200 rounded-md grid grid-cols-1 md:grid-cols-[0.5fr_1fr]">
        <div className="flex py-6 items-center justify-center relative">
          {/* <Avatar src="" alt={user.username} /> */}
          <div className="bg-gray-200 absolute z-0 w-30 h-full left-0"></div>
          <img
            src="default-user.jpg"
            alt=""
            className="w-30 z-1 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="self-start pt-6 pl-6">
            <Heading as="h4">John Doe</Heading>
          </div>
          <div className="p-6 text-center md:text-left grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Username:</p>
              <p className="ml-4 font-normal">{user.username}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p className="ml-4 font-normal">{user.username}</p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p className="ml-4 font-normal">{12324411}</p>
            </div>
          </div>
          <div className="flex align-bottom pb-6 pr-6 items-center justify-end gap-3 ">
            <Modal>
              <Modal.Open opens="edit">
                <Button size="small" variation="action">
                  <div className="flex gap-2 items-center">
                    <HiPencil />
                    <span>Edit</span>
                  </div>
                </Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Button size="small" variation="action">
                  <div className="flex gap-2 items-center">
                    <HiOutlineTrash />
                    <span>Delete</span>
                  </div>
                </Button>
              </Modal.Open>
              <Modal.Window name="edit">
                <CreateUserForm userToEdit={user} />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  disabled={isDeleting}
                  resourceName="user"
                  onConfirm={onDelete}
                />
              </Modal.Window>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
