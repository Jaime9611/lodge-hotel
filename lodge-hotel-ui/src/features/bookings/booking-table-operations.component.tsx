import { Filter, SortBy } from "@ui/atoms";

const BookingTableOperations = () => {
  return (
    <div className="flex items-center gap-6">
      <SortBy
        options={[
          { value: "id-asc", label: "Sort by id (ASC)" },
          { value: "id-desc", label: "Sort by id (DESC)" },
          { value: "startDate-asc", label: "Sort by date (ASC)" },
          { value: "startDate-desc", label: "Sort by date (DESC)" },
        ]}
      />
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
    </div>
  );
};

export default BookingTableOperations;
