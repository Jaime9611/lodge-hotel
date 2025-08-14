import type { FC, ReactNode } from "react";

interface HeaderMenuProps {
  children: ReactNode;
}

const HeaderMenu: FC<HeaderMenuProps> = ({ children }) => (
  <ul className="flex items-center gap-1.5">{children}</ul>
);

export default HeaderMenu;
