import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineHomeModern, HiOutlineUser } from "react-icons/hi2";

import HeaderMenu from "./header-menu.component";
import Logout from "@features/authentication/logout.component";
import { ButtonIcon } from "@ui/atoms";
import { useCart } from "@contexts";
import { ROUTES } from "@utils/constants";

const HeaderLanding = () => {
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header
      data-testid="header-dashboard-view"
      className="bg-white-50 py-5 px-9 border-b border-solid border-gray-100"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div>LOGO</div>

        <nav className="z-10 text-xl">
          <ul className="flex gap-16 items-center">
            <li>
              <NavLink
                to={ROUTES.user_cabins_path}
                className="hover:text-accent-400 transition-colors"
              >
                Cabins
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.about_path}
                className="hover:text-accent-400 transition-colors"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTES.user_account_path}
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
              >
                <img
                  className="h-8 rounded-full"
                  src="default-user.jpg"
                  alt="user-img"
                  referrerPolicy="no-referrer"
                />
                <span>Guest area</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default HeaderLanding;
