import { useNavigate } from "react-router-dom";

import { Button, Empty, Heading, Modal, Row, Spinner } from "@ui/atoms";
import type { BookingModel, CabinModel } from "@models";
import { Tag } from "@ui/atoms/Tag";
import { statusToTagName } from "@utils/helpers";
import { ConfirmDelete } from "@ui/molecules";
import { useMoveBack } from "@hooks";

import { ButtonText } from "@ui/atoms/ButtonText";
import { useDeleteCabin } from "./use-delete-cabin.hook";
import { useCabin } from "./use-cabin.hook";

const CabinDetail = () => {
  //   const { booking, isLoading } = useBooking();
  const { cabin, isLoading } = useCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!cabin) return <Empty resource="cabin" />;

  const { id } = cabin as CabinModel;

  return (
    <>
      <Row type="horizontal">
        <div className="flex items-center gap-9">
          <Heading as="h1">Cabin #{id}</Heading>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {/* <BookingDataBox booking={booking} /> */}

      <div className="flex gap-5 justify-end">
        {status === "UNCONFIRMED" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}
        {status === "CHECKED_IN" && (
          <Button disabled={false} onClick={() => undefined}>
            Check out
          </Button>
        )}
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
