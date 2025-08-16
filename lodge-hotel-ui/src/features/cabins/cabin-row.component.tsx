import { type FC } from "react";
import type { CabinModel } from "@models";
import { Table } from "@ui/molecules";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { Modal } from "@ui/atoms/Modal";
import { ConfirmDelete } from "@ui/molecules/ConfirmDelete";
import { IconStackMenu } from "@ui/atoms/IconStack";

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
          <IconStackMenu>
            <IconStackMenu.List>
              <Modal.Open opens="edit">
                <IconStackMenu.Button icon={<HiPencil />} />
              </Modal.Open>
              <Modal.Open opens="delete">
                <IconStackMenu.Button icon={<HiTrash />} />
              </Modal.Open>
            </IconStackMenu.List>
          </IconStackMenu>

          <Modal.Window name="edit">
            <div>Edit Cabin</div>
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabin"
              disabled={false}
              onConfirm={() => undefined}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
