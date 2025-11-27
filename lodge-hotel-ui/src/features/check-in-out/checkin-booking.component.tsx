import { useEffect, useState } from "react";

import { useBooking } from "@features/bookings/use-booking.hook";
import { BookingDataBox } from "@features/bookings";
import { useMoveBack } from "@hooks";
import { useCheckin } from "./use-checkin.hook";
import { Button, CheckBox, Empty, Heading, Row, Spinner } from "@ui/atoms";
import { ButtonText } from "@ui/atoms/ButtonText";
import type { BookingModel } from "@models";
import { formatCurrency } from "@utils/helpers";

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();

  const moveBack = useMoveBack();

  const { id: bookingId, guest, totalPrice } = (booking as BookingModel) ?? {};

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const handleCheckin = () => {
    if (!confirmPaid) return;
    checkin(bookingId);
  };

  if (isLoading) return <Spinner />;
  if (booking === undefined) return <Empty resource="booking" />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <div className="bg-white border border-solid border-gray-100 rounded-md px-9 py-16">
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          confirm that {guest?.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </CheckBox>
      </div>

      <div className="flex gap-5 justify-end">
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
};

export default CheckinBooking;
