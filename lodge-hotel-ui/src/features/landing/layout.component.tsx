import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-8 py-12 grid">
        <main data-testid="landing-main" className="max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LandingLayout;
