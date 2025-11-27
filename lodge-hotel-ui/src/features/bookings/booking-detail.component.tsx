import { useNavigate } from "react-router-dom";
import { useBooking } from "./use-booking.hook";
import { useDeleteBooking } from "./use-delete-booking.hook";
import { Button, Empty, Heading, Modal, Row, Spinner } from "@ui/atoms";
import type { BookingModel } from "@models";
import { Tag } from "@ui/atoms/Tag";
import { statusToTagName } from "@utils/helpers";
import { ConfirmDelete } from "@ui/molecules";
import { useMoveBack } from "@hooks";
import BookingDataBox from "./booking-data-box.component";
import { ButtonText } from "@ui/atoms/ButtonText";

const BookingDetail = () => {
  const { booking, isLoading } = useBooking();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { status, id } = booking as BookingModel;

  return (
    <>
      <Row type="horizontal">
        <div className="flex items-center gap-9">
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace("-", " ")}</Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

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
              resourceName="booking"
              onConfirm={() => {
                deleteBooking(id, { onSettled: () => navigate(-1) });
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
export default BookingDetail;
