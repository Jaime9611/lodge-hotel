import { useSearchParams } from "react-router-dom";

import { Table } from "@ui/molecules";
import CabinRow from "./cabin-row.component";
import { useQuery } from "@tanstack/react-query";
import { apiCabin } from "@services";
import { useCabins } from "./use-cabins.hook";
import { Pagination } from "@ui/atoms";

const CabinTable = () => {
  const { isPending, cabins, count } = useCabins();
  const [searchParams] = useSearchParams();

  // if (cabins === undefined || !cabins.length)
  //   return <Empty resource="cabins" />;

  // if (isPending) return <Spinner />;

  if (cabins === undefined) return <h1>No Cabins</h1>;

  //   if (isPending) return <Spinner />;
  if (isPending) return null;

  //   // SORT
  //   const sortBy = searchParams.get("sortBy") || "id-asc";
  //   const [field, direction] = sortBy.split("-");
  //   const modifier = direction === "asc" ? 1 : -1;
  //   const sortedCabins = cabins?.sort((a, b) => {
  //     if (field == "name") {
  //       return direction == "asc"
  //         ? a[field].toLowerCase().localeCompare(b[field].toLowerCase())
  //         : b[field].toLowerCase().localeCompare(a[field].toLowerCase());
  //     }

  //     return (a[field] - b[field]) * modifier;
  //   });
  return (
    <Table columns="0.6fr 2.2fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Name</div>
        <div>Price</div>
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
