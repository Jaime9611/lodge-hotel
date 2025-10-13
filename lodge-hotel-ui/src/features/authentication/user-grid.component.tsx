import { Avatar, Button, Empty, Modal, Spinner } from "@ui/atoms";
import { ConfirmDelete } from "@ui/molecules";
import type { FC } from "react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi2";
import { useEmployees } from "./use-employees.hook";
import CreateuserForm from "./create-user-form.component";
import { useDeleteEmployee } from "./use-delete-employee.hook";

interface UserGridProps {}

const UserGrid: FC<UserGridProps> = ({}) => {
  const { isPending, users } = useEmployees();
  const { isDeleting, deleteEmployee } = useDeleteEmployee();

  if (isPending) return <Spinner />;

  if (users === undefined || !users.length)
    return <Empty resource="employees" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {users.map((user) => (
        <div
          key={`user-card-${user.id}`}
          className="bg-white border border-solid border-gray-100 rounded-md p-6 flex"
        >
          <div className="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
            <Avatar src="" alt={user.username} />
          </div>
          <div className="flex-grow text-center md:text-left">
            <p className="font-bold">{user.username}</p>
            <div className="mt-2 mb-3"></div>
            <div className="flex gap-3">
              <Modal>
                <Modal.Open opens="edit">
                  <Button size="small" variation="secondary">
                    <div className="flex gap-2 items-center text-gray-500">
                      <HiPencil />
                      <span>Edit</span>
                    </div>
                  </Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Button size="small" variation="secondary">
                    <div className="flex gap-2 items-center text-gray-500">
                      <HiOutlineTrash />
                      <span>Delete</span>
                    </div>
                  </Button>
                </Modal.Open>
                <Modal.Window name="edit">
                  <CreateuserForm userToEdit={user} />
                </Modal.Window>
                <Modal.Window name="delete">
                  <ConfirmDelete
                    disabled={isDeleting}
                    resourceName="user"
                    onConfirm={() => deleteEmployee(user.id)}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGrid;
