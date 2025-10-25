import { Suspense, type FC } from "react";

import { HiEyeSlash, HiMapPin, HiUsers } from "react-icons/hi2";
import { useCabin } from "./use-cabin.hook";
import { Empty, Spinner } from "@ui/atoms";
import { Reservation } from "@features/bookings";

interface CabinUserDetailProps {}

const CabinUserDetail: FC<CabinUserDetailProps> = ({}) => {
  const { cabin, isLoading } = useCabin();

  if (isLoading) return <Spinner />;
  if (!cabin) return <Empty resource="cabin" />;

  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-gray-300 mb-24 rounded-lg">
        <div className="relative">
          <img
            src={image}
            className="object-cover rounded-tl-lg rounded-bl-lg w-sm"
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-6xl mb-5  bg-primary-950 py-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <div>{description}</div>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <HiUsers className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <HiMapPin className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <HiEyeSlash className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve <em className="text-primary-500">{cabin.name}</em> today. Pay
          on arrival.
        </h2>

        {/* <Suspense fallback={<Spinner />}> */}
        <Reservation cabin={cabin} />
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default CabinUserDetail;
