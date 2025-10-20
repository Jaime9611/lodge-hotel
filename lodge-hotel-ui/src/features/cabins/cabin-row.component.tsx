import { type FC } from "react";
import {
  HiClock,
  HiEye,
  HiHomeModern,
  HiOutlineHomeModern,
  HiPencil,
  HiShoppingBag,
  HiTrash,
} from "react-icons/hi2";
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
import { useCart } from "@contexts";

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
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const isCabinInCart = cartItems.find((item) => item.id === cabinId);

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
              {isCabinInCart && (
                <HiHomeModern className=" text-primary-500 absolute right-44 top-1 bottom-0 text-2xl" />
              )}
              <IconStackMenu.Button
                onClick={() => navigate(`${ROUTES.cabins_path}/${cabinId}`)}
                icon={<HiEye />}
                displayText="See details"
              />
              {isCabinInCart ? (
                <IconStackMenu.Button
                  onClick={() => removeFromCart({ id: cabinId, name })}
                  icon={
                    <div className="relative">
                      <HiOutlineHomeModern className=" text-primary-500" />
                      <span className="absolute bottom-1 left-3 text-gray-400 text-sm">
                        &#8593;
                      </span>
                    </div>
                  }
                  displayText="Remove from Cart"
                />
              ) : (
                <IconStackMenu.Button
                  onClick={() => addToCart({ id: cabinId, name })}
                  icon={<HiOutlineHomeModern />}
                  displayText="Add to Cart"
                />
              )}

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
