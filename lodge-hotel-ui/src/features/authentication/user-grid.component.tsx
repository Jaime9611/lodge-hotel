import { Avatar, Button, ButtonIcon } from "@ui/atoms";
import type { FC } from "react";
import { HiOutlineTrash, HiPencil, HiTrash } from "react-icons/hi2";

interface UserGridProps {}

const fakeUsers = [
  { userId: 1, fullName: "John Doe", email: "john@email.com" },
  { userId: 1, fullName: "Jane Smith", email: "jane@email.com" },
  {
    userId: 1,
    fullName: "Pedro Caminos",
    email: "pedro@email.com",
  },
];

const UserGrid: FC<UserGridProps> = ({}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fakeUsers.map((user) => (
        <div
          key={`user-card-${user.userId}`}
          className="bg-white border border-solid border-gray-100 rounded-md p-6 flex"
        >
          <div className="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
            <Avatar src="" alt={user.fullName} />
          </div>
          <div className="flex-grow text-center md:text-left">
            <p className="font-bold">{user.fullName}</p>
            <h3 className="text-xl heading">{user.email}</h3>
            <div className="mt-2 mb-3"></div>
            <div className="flex gap-3">
              <Button size="small" variation="secondary">
                <div className="flex gap-2 items-center text-gray-500">
                  <HiPencil />
                  <span>Edit</span>
                </div>
              </Button>
              <Button size="small" variation="secondary">
                <div className="flex gap-2 items-center text-gray-500">
                  <HiOutlineTrash />
                  <span>Delete</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserGrid;
