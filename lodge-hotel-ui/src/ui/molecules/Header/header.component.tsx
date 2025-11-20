import { useNavigate } from "react-router-dom";

import HeaderMenu from "./header-menu.component";
import Logout from "@features/authentication/logout.component";
import { ButtonIcon } from "@ui/atoms";
import { ROUTES } from "@utils/constants";
import AvatarMini from "@ui/atoms/Avatar/avatar-mini.component";

import { useUser } from "@features/authentication";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <header
      data-testid="header-dashboard-view"
      className="bg-white-50 py-5 px-16 border-b border-solid border-gray-100 flex gap-9 items-center justify-end"
    >
      <HeaderMenu>
        <li>
          <ButtonIcon onClick={() => navigate(ROUTES.account_path)}>
            <AvatarMini
              src={user?.image || ""}
              alt={user?.fullName || "user profile"}
            />
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
