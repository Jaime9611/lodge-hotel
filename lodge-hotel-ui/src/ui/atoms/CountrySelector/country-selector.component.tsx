import { useEffect, useState, type FC } from "react";
// import ReactSelect from "react-select/async";
import ReactFlagsSelect from "react-flags-select";
import axios from "axios";

export interface CountryModel {
  value: string;
  label: string;
  image: string;
}

interface CountrySelectorProps {
  onUpdate: (country: CountryModel) => void;
  register?: {};
}

const CountrySelector: FC<CountrySelectorProps> = ({ onUpdate, register }) => {
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
      {...register}
    />
  );
};

export default CountrySelector;
