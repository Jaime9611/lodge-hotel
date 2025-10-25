import type { FC } from "react";

import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useLogout } from "./use-logout.hook";
import { ButtonIcon, SpinnerMini } from "@ui/atoms";
import { ButtonText } from "@ui/atoms/ButtonText";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = () => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={() => logout()}>
      {!isLoading ? (
        <div className="flex gap-3 px-7">
          <HiArrowLeftOnRectangle />
          <span>Sign Out</span>
        </div>
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
};

export default SignOutButton;
