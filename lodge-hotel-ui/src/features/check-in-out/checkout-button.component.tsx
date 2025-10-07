import type { FC } from "react";

import { useCheckout } from "./use-checkout.hook";
import { Button } from "@ui/atoms";

interface CheckoutButtonProps {
  bookingId: number;
}

const CheckoutButton: FC<CheckoutButtonProps> = ({ bookingId }) => {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
