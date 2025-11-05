import { Empty, Spinner } from "@ui/atoms";

import type { FC } from "react";

import { useEmployees } from "./use-employees.hook";

import { useDeleteEmployee } from "./use-delete-employee.hook";
import UserCard from "./user-card.component";

interface UserGridProps {}

const UserGrid: FC<UserGridProps> = ({}) => {
  const { isPending, users } = useEmployees();
  const { isDeleting, deleteEmployee } = useDeleteEmployee();

  if (isPending) return <Spinner />;

  if (users === undefined || !users.length)
    return <Empty resource="employees" />;

  return (
    <div className="max-w-8xl grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 items-center">
      {users.map((user) => (
        <>
          <UserCard
            key={`user-card-item-${user.id}`}
            user={user}
            onDelete={() => deleteEmployee(user.id)}
            isDeleting={isDeleting}
          />
        </>
      ))}
    </div>
  );
};

export default UserGrid;
