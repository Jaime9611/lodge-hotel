import { Button } from "@ui/atoms";
import { ROUTES } from "@utils/constants";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className="mt-24">
      <img src="" className="object-cover object-top" alt="Great Cabins" />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to our Logde hotel
        </h1>
        <Button
          size="large"
          variation="primary"
          onClick={() => navigate(`${ROUTES.user_cabins_path}`)}
        >
          Explore cabins
        </Button>
      </div>
    </main>
  );
};

export default Landing;
