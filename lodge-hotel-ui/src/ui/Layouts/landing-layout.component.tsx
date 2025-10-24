import { Outlet } from "react-router-dom";

import { HeaderLanding as Header } from "@ui/molecules";

const LandingLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ gridTemplateColumns: "23rem 1fr", gridTemplateRows: "auto 1fr" }}
    >
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
