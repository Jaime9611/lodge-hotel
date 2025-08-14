import type { FC, ReactNode } from "react";
import {
  HiOutlineBeaker,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUser,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

interface CustomNavLinkProps {
  to: string;
  children: ReactNode;
}
const CustomNavLink: FC<CustomNavLinkProps> = ({ to, children }) => (
  <NavLink to={to} className="nav_link">
    {children}
  </NavLink>
);

const Sidebar = () => {
  return (
    <aside className="bg-white py-12 px-9 border-r border-solid border-gray-100 row-span-full flex flex-col gap-11">
      <div className="h-48 w-48 text-center">LOGO</div>
      <ul className="flex flex-col gap-3">
        <li>
          <CustomNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/users">
            <HiOutlineUser />
            <span>Users</span>
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </CustomNavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
