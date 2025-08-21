import { useSearchParams } from "react-router-dom";

import { Table } from "@ui/molecules";
import CabinRow from "./cabin-row.component";
import { useCabins } from "./use-cabins.hook";
import { Pagination } from "@ui/atoms";

const CabinTable = () => {
  const { isPending, cabins, count } = useCabins();
  // const [searchParams] = useSearchParams();

  if (cabins === undefined) return <h1>No Cabins</h1>;
  // if (cabins === undefined || !cabins.length)
  //   return <Empty resource="cabins" />;

  // if (isPending) return <Spinner />;
  if (isPending) return null;

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
