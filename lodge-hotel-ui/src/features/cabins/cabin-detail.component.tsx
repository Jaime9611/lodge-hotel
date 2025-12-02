import type { FC } from "react";

import { HiEyeSlash, HiMapPin, HiUsers } from "react-icons/hi2";
import { useCabin } from "./use-cabin.hook";
import { Button, Empty, Heading, Image, Modal, Row, Spinner } from "@ui/atoms";
import { Reservation } from "@features/bookings";
import { useDeleteCabin } from "./use-delete-cabin.hook";
import { useMoveBack } from "@hooks";
import { useNavigate } from "react-router-dom";
import { ButtonText } from "@ui/atoms/ButtonText";
import { ConfirmDelete } from "@ui/molecules";

interface CabinUserDetailProps {}

const CabinUserDetail: FC<CabinUserDetailProps> = ({}) => {
  const { cabin, isLoading } = useCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!cabin) return <Empty resource="cabin" />;

  const { name, maxCapacity, image, description, id } = cabin;

  return (
    <>
      <Row type="horizontal">
        <div className="flex items-center gap-9">
          <Heading as="h1">Cabin Detail</Heading>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <div>
        <div className="grid grid-cols-[3fr_4fr] gap-20 border border-gray-300 mb-24 rounded-lg">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="object-cover rounded-tl-lg rounded-bl-lg h-[500px] w-full"
            />
          </div>

          <div>
            <h3 className="text-accent-100 font-black text-6xl mb-5  bg-primary-950 py-6 pb-1 w-[150%]">
              {name}
            </h3>

            <p className="text-lg text-primary-300 mb-10">{description}</p>

            <ul className="flex flex-col gap-4 mb-7">
              <li className="flex gap-3 items-center">
                <HiUsers className="h-5 w-5 text-primary-600" />
                <span className="text-lg">
                  For up to <span className="font-bold">{maxCapacity}</span>{" "}
                  guests
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <HiMapPin className="h-5 w-5 text-primary-600" />
                <span className="text-lg">
                  Located in the heart of the{" "}
                  <span className="font-bold">Dolomites</span> (Italy)
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <HiEyeSlash className="h-5 w-5 text-primary-600" />
                <span className="text-lg">
                  Privacy <span className="font-bold">100%</span> guaranteed
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Heading as="h1">Reservation</Heading>
          <div className="mt-10">
            <Reservation cabin={cabin} />
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-end">
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="cabin"
              onConfirm={() => {
                deleteCabin(id, { onSettled: () => navigate(-1) });
              }}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
};

export default CabinUserDetail;
