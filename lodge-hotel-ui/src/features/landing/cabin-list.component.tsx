import type { FC } from "react";
import CabinCard from "./cabin-card.component";
import { useCabins } from "../cabins/use-cabins.hook";
import { Empty, Spinner } from "@ui/atoms";

interface CabinListProps {
  filter: string;
}

const CabinList: FC<CabinListProps> = ({ filter }) => {
  const { cabins, isPending } = useCabins();

  if (isPending) return <Spinner />;

  if (cabins === undefined || !cabins.length)
    return <Empty resource="cabins" />;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins &&
        displayedCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={`cabin-card-${cabin.id}`} />
        ))}
    </div>
  );
};

export default CabinList;
