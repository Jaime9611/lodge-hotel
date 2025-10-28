import { NavLink } from "react-router-dom";

import { ROUTES } from "@utils/constants";

const LoginMessage = () => {
  return (
    <div className="grid bg-gray-300 ">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <NavLink
          to={ROUTES.login_path}
          className="underline text-primary-500 text-accent-500"
        >
          login
        </NavLink>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
};

export default LoginMessage;
