import type { FC } from "react";
import { useSearchParams } from "react-router-dom";

import { Select } from "../Select";

type SortOption = { value: string; label: string };

interface SortByProps {
  options: SortOption[];
}

const SortBy: FC<SortByProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      type="white"
      value={currentSortBy}
      options={options}
      onChange={handleChange}
    />
  );
};

export default SortBy;
