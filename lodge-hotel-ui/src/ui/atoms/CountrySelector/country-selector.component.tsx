import { type FC } from "react";
import ReactSelect from "react-select";
import Flag from "../Flag/flag.component";

export interface CountryModel {
  value: string;
  label: string;
  image: string;
}

const countries: CountryModel[] = [
  { value: "US", label: "United States", image: "https://flagcdn.com/us.svg" },
  { value: "CA", label: "Canada", image: "https://flagcdn.com/ca.svg" },
  { value: "CO", label: "Colombia", image: "https://flagcdn.com/co.svg" },
  { value: "VE", label: "Venezuela", image: "https://flagcdn.com/ve.svg" },
];

const customSingleValue = ({ data }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    <Flag src={data.image} alt={data.label} />
    {data.label}
  </div>
);

const customOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{ display: "flex", alignItems: "center", padding: 10 }}
    >
      <Flag src={data.image} alt={data.label} />
      {data.label}
    </div>
  );
};

interface CountrySelectorProps {
  onUpdate: (country: CountryModel) => void;
}

const CountrySelector: FC<CountrySelectorProps> = ({ onUpdate }) => {
  const handleChange = (selectedItem, event) => {
    if (selectedItem !== null) {
      const selected = countries?.filter(
        (country) => country.label == selectedItem.label
      )[0];
      if (selected) {
        onUpdate(selected);
      }
    }
  };

  return (
    <ReactSelect
      options={countries}
      onChange={handleChange}
      components={{ SingleValue: customSingleValue, Option: customOption }}
      placeholder="Select a country"
    />
  );
};

export default CountrySelector;
