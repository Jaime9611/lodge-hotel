import { useNavigate } from "react-router-dom";

import {
  Button,
  DataItem,
  Empty,
  Heading,
  Modal,
  Row,
  Spinner,
} from "@ui/atoms";
import type { BookingModel, CabinModel } from "@models";
import { Tag } from "@ui/atoms/Tag";
import { formatCurrency, statusToTagName } from "@utils/helpers";
import { ConfirmDelete } from "@ui/molecules";
import { useMoveBack } from "@hooks";

import { ButtonText } from "@ui/atoms/ButtonText";
import { useDeleteCabin } from "./use-delete-cabin.hook";
import { useCabin } from "./use-cabin.hook";
import { HiOutlineCurrencyDollar, HiOutlineHomeModern } from "react-icons/hi2";

// ---------------- BOX COMPONENT ----------------

interface DataBoxProps {
  children: ReactNode;
}

const DataBox: FC<DataBoxProps> = ({ children }) => (
  <div className="bg-white border border-solid border-gray-100 rounded-md ">
    {children}
  </div>
);

// ---------------- HEADER COMPONENT ----------------

interface DataHeaderProps {
  children: ReactNode;
}

const DataHeader: FC<DataHeaderProps> = ({ children }) => (
  <div className="bg-primary-500 py-8 px-16 text-[#e0e7ff] text-2xl font-medium flex items-center justify-between [&_svg]:h-12 [&_svg]:w-12 [&_div:first-child]:flex [&_div:first-child]:items-center [&_div:first-child]:gap-6 [&_div:first-child]:font-semibold [&_div:first-child]:text-2xl [&_span]:text-3xl [&_span]:ml-1">
    {children}
  </div>
);

// ---------------- MAIN COMPONENT ----------------

const CabinDetail = () => {
  const { cabin, isLoading } = useCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!cabin) return <Empty resource="cabin" />;

  const { id, name, regularPrice, description, maxCapacity, image } =
    cabin as CabinModel;

  return (
    <>
      <Row type="horizontal">
        <div className="flex items-center gap-9">
          <Heading as="h1">Cabin Detail</Heading>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <DataBox>
        <DataHeader>
          <div>
            <HiOutlineHomeModern />
            <p>
              <span>{name}</span>
            </p>
          </div>
          <DataItem
            icon={<HiOutlineCurrencyDollar style={{ color: "#e0e7ff" }} />}
            label=""
          >
            {formatCurrency(regularPrice)}
          </DataItem>
        </DataHeader>
        <div className="pt-12 px-16 pb-5">
          <img
            className="block w-md rounded-sm aspect-3/2 object-cover object-center scale-1.5 -translate-x-1.5"
            src={image}
          />

          <div className="mt-3 text-xl">
            <p>
              Max capacity:{" "}
              <span className="font-medium">{maxCapacity} people</span>
            </p>
            {description && (
              <div className="mt-4">
                <h5 className="font-semibold">Description</h5>
                <p className="text-lg">{description}</p>
              </div>
            )}
          </div>
        </div>
      </DataBox>

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
export default CabinDetail;
