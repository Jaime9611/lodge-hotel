import type { FC } from "react";
import { Outlet } from "react-router-dom";

import SideNavigation from "./side-navigation.component";

interface AccountLayoutProps {}

const AccountLayout: FC<AccountLayoutProps> = ({}) => {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
