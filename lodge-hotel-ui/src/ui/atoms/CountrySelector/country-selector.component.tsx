import { useCallback, useEffect, useState, type FC } from "react";
// import ReactSelect from "react-select/async";
import ReactFlagsSelect from "react-flags-select";
import Flag from "../Flag/flag.component";
import axios from "axios";

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
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    const fetchCountry = async (code: string) => {
      await axios
        .get(`https://restcountries.com/v3.1/alpha/${code}`)
        .then((response) => {
          const countryData: CountryModel = {
            label: response.data[0].name.common,
            image: `https://flagcdn.com/${code.toLowerCase()}.svg`,
            value: code,
          };
          console.log(countryData);
          onUpdate(countryData);
        })
        .catch((error) => {
          console.error("Error fetching the country data:", error);
        });
    };

    if (selectedCode) {
      fetchCountry(selectedCode);
    }
  }, [selectedCode]);

  return (
    <ReactFlagsSelect
      selected={selectedCode}
      onSelect={(code) => setSelectedCode(code)}
      searchable
      searchPlaceholder="Search for a Country..."
    />
  );
};

export default CountrySelector;
