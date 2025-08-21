import { useSearchParams } from "react-router-dom";

import { Table } from "@ui/molecules";
import CabinRow from "./cabin-row.component";
import { useCabins } from "./use-cabins.hook";
import { Empty, Pagination, Spinner } from "@ui/atoms";

const CabinTable = () => {
  const { isPending, cabins, count } = useCabins();
  // const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  if (cabins === undefined || !cabins.length)
    return <Empty resource="cabins" />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Name</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={cabins}
        render={(cabin) => (
          <CabinRow key={`cabin-table-row-${cabin.id}`} cabin={cabin} />
        )}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
};

export default CabinTable;
