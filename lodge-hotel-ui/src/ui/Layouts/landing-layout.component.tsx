import { Outlet } from "react-router-dom";

import { HeaderLanding as Header } from "@ui/molecules";

const LandingLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LandingLayout;
