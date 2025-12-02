import { useAuth } from "@contexts";
import { useSettings } from "@features/settings";
import { Image } from "@ui/atoms";
import { ROLE, ROUTES } from "@utils/constants";
import type { FC, ReactNode } from "react";
import {
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
  <NavLink to={to} className="nav_link" end>
    {children}
  </NavLink>
);

const Sidebar = () => {
  const { role } = useAuth();
  const { settings } = useSettings();

  return (
    <aside
      data-testid="sidebar-dashboard-view"
      className="bg-white py-12 px-9  row-span-full flex flex-col gap-11"
    >
      <div className="flex justify-center">
        <Image
          className="h-36 w-auto text-center"
          src={settings.logoImage}
          alt="App logo"
          type="cabin"
        />
      </div>
      <ul className="flex flex-col gap-3">
        <li>
          <CustomNavLink to={ROUTES.dashboard_path}>
            <HiOutlineHome />
            <span>Home</span>
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTES.cabins_path}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTES.bookings_path}>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </CustomNavLink>
        </li>

        {role === ROLE.MANAGER && (
          <>
            <li>
              <CustomNavLink to={ROUTES.users_path}>
                <HiOutlineUser />
                <span>Users</span>
              </CustomNavLink>
            </li>
            <li>
              <CustomNavLink to={ROUTES.settings_path}>
                <HiOutlineCog6Tooth />
                <span>Settings</span>
              </CustomNavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
