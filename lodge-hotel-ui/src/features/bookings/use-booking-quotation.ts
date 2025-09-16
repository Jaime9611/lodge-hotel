import { useMutation } from "@tanstack/react-query";
import { apiBooking } from "@services";
import type { BookingQuotationRequest } from "@models";

export const useBookingQuotation = () => {
  const {
    isPending: isCalculatingTotal,
    mutate: calculateTotalPrice,
    data: totalPrice,
  } = useMutation({
    mutationFn: (treatment: BookingQuotationRequest) =>
      apiBooking.getQuotation(treatment),
    mutationKey: ["booking/quotation"],
  });

  return { isCalculatingTotal, calculateTotalPrice, totalPrice };
};
