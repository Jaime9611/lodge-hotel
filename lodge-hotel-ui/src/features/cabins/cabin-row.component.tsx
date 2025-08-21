import { type FC } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { Table } from "@ui/molecules";
import { Modal } from "@ui/atoms/Modal";
import { ConfirmDelete } from "@ui/molecules";
import { IconStackMenu } from "@ui/atoms";
import type { CabinModel } from "@models";
import CreateCabinForm from "./create-cabin-form.component";
import { useDeleteCabin } from "./use-delete-cabin.hook";
import { formatCurrency } from "@utils/helpers";

type CabinRowProps = {
  cabin: CabinModel;
};

const CabinRow: FC<CabinRowProps> = ({ cabin }) => {
  const { id, name, regularPrice, maxCapacity, discount } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <Table.Row>
      <div className="text-xl text-gray-600 font-medium">{`CBN-${id}`}</div>
      <div>{name}</div>
      {/* <Price>{formatCurrency(regularPrice)}</Price> */}
      <div>{maxCapacity}</div>
      <div>{formatCurrency(regularPrice)}</div>
      {discount ? <div>{formatCurrency(discount)}</div> : <span>&mdash;</span>}
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
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
