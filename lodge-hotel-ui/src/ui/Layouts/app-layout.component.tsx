import { Outlet } from "react-router-dom";

import { Header } from "@ui/molecules";
import Sidebar from "./sidebar.component";

type Props = {};

const AppLayout = (props: Props) => {
  return (
    <div
      className="h-screen grid"
      style={{ gridTemplateColumns: "26rem 1fr", gridTemplateRows: "auto 1fr" }}
    >
      <Header />
      <Sidebar />
      <main className="bg-gray-50 pt-14 px-16 pb-24 overflow-scroll">
        <div
          className="my-0 mx-auto flex flex-col gap-12"
          style={{ maxWidth: "120rem" }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
