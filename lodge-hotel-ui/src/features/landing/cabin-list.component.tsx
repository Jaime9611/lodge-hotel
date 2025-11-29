import CabinCard from "./cabin-card.component";
import { Empty, Spinner } from "@ui/atoms";
import { useCabinsByCapacity } from "@features/cabins";

const CabinList = () => {
  const { cabins, isPending } = useCabinsByCapacity();

  if (isPending) return <Spinner />;

  if (cabins === undefined || !cabins.length)
    return <Empty resource="cabins" />;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins &&
        cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={`cabin-card-${cabin.id}`} />
        ))}
    </div>
  );
};

export default CabinList;
