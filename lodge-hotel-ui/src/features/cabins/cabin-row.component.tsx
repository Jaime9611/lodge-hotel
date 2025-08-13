import type { CabinModel } from "@models";
import { Table } from "@ui/molecules";
import { type FC } from "react";

type CabinRowProps = {
  cabin: CabinModel;
};

// TODO: ADD COMPONENTS FOR ROW
const CabinRow: FC<CabinRowProps> = ({ cabin }) => {
  const { id, name, price } = cabin;
  return (
    <Table.Row>
      <div className="text-xl text-gray-600 font-medium">{`CBN-${id}`}</div>
      <div>{name}</div>
      {/* <Price>{formatCurrency(regularPrice)}</Price> */}
      <div>{price}</div>
      <div>Options...</div>
    </Table.Row>
  );
};

export default CabinRow;
