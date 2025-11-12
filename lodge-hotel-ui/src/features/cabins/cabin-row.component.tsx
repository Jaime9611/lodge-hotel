import { type FC } from "react";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import { Table } from "@ui/molecules";
import { Modal } from "@ui/atoms/Modal";
import { ConfirmDelete } from "@ui/molecules";
import { IconStackMenu } from "@ui/atoms";
import type { CabinModel } from "@models";
import CreateCabinForm from "./create-cabin-form.component";
import { useDeleteCabin } from "./use-delete-cabin.hook";
import { formatCurrency } from "@utils/helpers";
import { ROUTES } from "@utils/constants";
import { useNavigate } from "react-router-dom";

type CabinRowProps = {
  cabin: CabinModel;
};

const CabinRow: FC<CabinRowProps> = ({ cabin }) => {
  const {
    id: cabinId,
    name,
    regularPrice,
    maxCapacity,
    discount,
    image,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const navigate = useNavigate();

  return (
    <Table.Row>
      <img
        className="block w-24 rounded-sm aspect-3/2 object-cover object-center scale-1.5 -translate-x-1.5"
        src={image}
      />
      <div>{name}</div>
      <div>{maxCapacity}</div>
      <div>{formatCurrency(regularPrice)}</div>
      {discount ? <div>{formatCurrency(discount)}</div> : <span>&mdash;</span>}
      <div className="relative">
        <Modal>
          <IconStackMenu>
            <IconStackMenu.List>
              <IconStackMenu.Button
                onClick={() => navigate(`${ROUTES.cabins_path}/${cabinId}`)}
                icon={<HiEye />}
                displayText="See details"
              />

              <Modal.Open opens="edit">
                <IconStackMenu.Button displayText="Edit" icon={<HiPencil />} />
              </Modal.Open>
              <Modal.Open opens="delete">
                <IconStackMenu.Button displayText="Delete" icon={<HiTrash />} />
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
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
