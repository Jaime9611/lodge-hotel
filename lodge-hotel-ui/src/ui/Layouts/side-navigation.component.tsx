import { SignOutButton } from "@features/authentication";
import { HiCalendarDays, HiHome, HiUser } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const navLinks = [
  // {
  //   name: "Home",
  //   to: "/account",
  //   icon: <HiHome className="h-5 w-5 text-primary-600" />,
  // },
  {
    name: "Reservations",
    to: "/account/reservations",
    icon: <HiCalendarDays className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    to: "/account/profile",
    icon: <HiUser className="h-5 w-5 text-primary-600" />,
  },
];

const SideNavigation = () => {
  return (
    <nav className="border-r border-primary-100">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink className="nav_link py-3 px-5" to={link.to} end>
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
