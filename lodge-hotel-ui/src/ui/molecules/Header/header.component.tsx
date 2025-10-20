import { useNavigate } from "react-router-dom";
import { HiOutlineHomeModern, HiOutlineUser } from "react-icons/hi2";

import HeaderMenu from "./header-menu.component";
import Logout from "@features/authentication/logout.component";
import { ButtonIcon } from "@ui/atoms";
import { useCart } from "@contexts";
import { ROUTES } from "@utils/constants";

const Header = () => {
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <header
      data-testid="header-dashboard-view"
      className="bg-white-50 py-5 px-16 border-b border-solid border-gray-100 flex gap-9 items-center justify-end"
    >
      <HeaderMenu>
        {count > 0 && (
          <li>
            <ButtonIcon onClick={() => navigate(ROUTES.cabins)}>
              <div className="relative">
                <HiOutlineHomeModern />
                <span className="absolute left-4 top-0 rounded-full bg-orange-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm leading-tight text-center">
                  {count}
                </span>
              </div>
            </ButtonIcon>
          </li>
        )}

        <li>
          <ButtonIcon onClick={() => undefined}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <Logout />
        </li>
      </HeaderMenu>
    </header>
  );
};
export default Header;
