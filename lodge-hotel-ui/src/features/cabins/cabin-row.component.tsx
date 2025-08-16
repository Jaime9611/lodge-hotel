import { type FC } from "react";
import type { CabinModel } from "@models";
import { Table } from "@ui/molecules";
import { HiPencil } from "react-icons/hi2";
import { Modal } from "@ui/atoms/Modal";
import { ConfirmDelete } from "@ui/molecules/ConfirmDelete";

type CabinRowProps = {
  cabin: CabinModel;
};

const CabinRow: FC<CabinRowProps> = ({ cabin }) => {
  const { id, name, price } = cabin;
  return (
    <Table.Row>
      <div className="text-xl text-gray-600 font-medium">{`CBN-${id}`}</div>
      <div>{name}</div>
      {/* <Price>{formatCurrency(regularPrice)}</Price> */}
      <div>{price}</div>
      <div>
        <Modal>
          <ul className="flex items-center gap-2">
            <li>
              <Modal.Open opens="delete">
                <button
                  type="button"
                  className="bg-none p-2 text-lg hover:bg-gray-50 border border-gray-300 rounded-md [&_svg]:w-4 [&_svg]:h-4 [&_svg]:text-gray-400 [&_svg]:transition-all "
                >
                  <HiPencil />
                </button>
              </Modal.Open>
            </li>
            <li>
              <Modal.Open opens="delete">
                <button
                  type="button"
                  className="bg-none p-2 text-lg hover:bg-gray-50 border border-gray-300 rounded-md [&_svg]:w-4 [&_svg]:h-4 [&_svg]:text-gray-400 [&_svg]:transition-all"
                >
                  <HiPencil />
                </button>
              </Modal.Open>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabin"
                  disabled={false}
                  onConfirm={() => undefined}
                />
              </Modal.Window>
            </li>
          </ul>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
