import { formatDistance, parseISO } from "date-fns";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

export const statusToTagName: { [key: string]: "blue" | "green" | "silver" } = {
  CHECKED_IN: "green",
  UNCONFIRMED: "blue",
  CHECKED_OUT: "silver",
};
