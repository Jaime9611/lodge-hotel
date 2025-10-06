import type { FC } from "react";

import { CheckinBooking } from "@features/check-in-out";

interface CheckinProps {}

const Checkin: FC<CheckinProps> = () => {
  return <CheckinBooking />;
};

export default Checkin;
