import { Filter, SortBy } from "@ui/atoms";

const CabinTableOperations = () => {
  return (
    <div className="flex items-center gap-6">
      <SortBy
        options={[
          { value: "id-asc", label: "Sort by id (ASC)" },
          { value: "id-desc", label: "Sort by id (DESC)" },
          { value: "name-asc", label: "Sort by Name (ASC)" },
          { value: "name-desc", label: "Sort by Name (DESC)" },
          { value: "regularPrice-asc", label: "Sort by Price (ASC)" },
          { value: "regularPrice-desc", label: "Sort by Price (DESC)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (ASC)" },
          { value: "maxCapacity-desc", label: "Sort by Capacity (DESC)" },
        ]}
      />
    </div>
  );
};

export default CabinTableOperations;
