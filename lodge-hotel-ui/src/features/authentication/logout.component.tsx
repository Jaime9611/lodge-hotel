import type { FC } from "react";

// import SpinnerMini from "@ui/spinner-mini.component";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./use-logout.hook";
import { ButtonIcon, SpinnerMini } from "@ui/atoms";

interface LogoutProps {}

const Logout: FC<LogoutProps> = () => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={() => logout()}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
