import { useEffect, useState, type FC, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./filter.module.css";

// ---------------- FilterButton COMPONENT ----------------

interface FilterButtonProps {
  onClick: () => void;
  disabled: boolean;
  isActive: boolean;
  children: ReactNode;
}

const FilterButton: FC<FilterButtonProps> = ({
  isActive,
  disabled,
  onClick,
  children,
}) => (
  <button
    className={
      isActive ? `${styles.filter} ${styles.active}` : `${styles.filter}`
    }
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// ---------------- MAIN COMPONENT ----------------

type SearchOption = { value: string; label: string };

interface FilterProps {
  filterField: string;
  options: SearchOption[];
}

const Filter: FC<FilterProps> = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let currentFilter = searchParams.get(filterField) || options[0].value;

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");

    setSearchParams(searchParams);
  };

  return (
    <div className="border border-solid border-gray-100 bg-white shadow-sm rounded-sm p-1.5 flex gap-1.5 w-">
      {options.map((option) => (
        <FilterButton
          key={`filter-button-${option.value}`}
          onClick={() => handleClick(option.value)}
          isActive={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </div>
  );
};

export default Filter;
