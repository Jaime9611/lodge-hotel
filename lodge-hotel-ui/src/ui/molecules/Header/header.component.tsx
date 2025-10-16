import { ButtonIcon } from "@ui/atoms";
import HeaderMenu from "./header-menu.component";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "@features/authentication/logout.component";

const Header = () => (
  <header
    data-testid="header-dashboard-view"
    className="bg-white-50 py-5 px-16 border-b border-solid border-gray-100 flex gap-9 items-center justify-end"
  >
    <HeaderMenu>
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

export default Header;
