import { useNavigate } from "react-router-dom";
import { HiOutlineHomeModern, HiOutlineUser } from "react-icons/hi2";

import HeaderMenu from "./header-menu.component";
import Logout from "@features/authentication/logout.component";
import { ButtonIcon } from "@ui/atoms";
import { useCart } from "@contexts";
import { ROUTES } from "@utils/constants";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      data-testid="header-dashboard-view"
      className="bg-white-50 py-5 px-16 border-b border-solid border-gray-100 flex gap-9 items-center justify-end"
    >
      <HeaderMenu>
        <li>
          <ButtonIcon onClick={() => navigate(ROUTES.account_path)}>
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
