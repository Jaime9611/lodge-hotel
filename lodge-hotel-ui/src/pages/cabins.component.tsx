import { apiCabin } from "@services";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const Cabins = (props: Props) => {
  const { data: cabin, isPending } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => apiCabin.getCabin(1),
  });

  if (isPending) return <h1>No cabin</h1>;

  return <div>{cabin?.name}</div>;
};

export default Cabins;
