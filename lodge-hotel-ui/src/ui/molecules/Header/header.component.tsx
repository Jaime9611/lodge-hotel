import HeaderMenu from "./header-menu.component";

const Header = () => (
  <header className="bg-white-50 py-5 px-16 border-b border-solid border-gray-100 flex gap-9 items-center justify-end">
    <HeaderMenu>
      <li>Today</li>
      <li>User</li>
      <li>Logout</li>
    </HeaderMenu>
  </header>
);

export default Header;
