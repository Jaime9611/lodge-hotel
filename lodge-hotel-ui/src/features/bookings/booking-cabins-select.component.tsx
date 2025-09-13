import { useEffect, useState, type FC, type ReactNode } from "react";
import ReactSelect from "react-select";

import { HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";

import type { CabinModel } from "@models";

import { useCabins } from "@features/cabins/use-cabins.hook";
import { ButtonIcon } from "@ui/atoms";

// ------------ UI COMPONENTS ------------

interface UIComponentProps {
  children: ReactNode;
}

const ItemLabel: FC<UIComponentProps> = ({ children }) => (
  <p className="font-normal text-left">{children}</p>
);

const LabelContainer: FC<UIComponentProps> = ({ children }) => (
  <div className="flex w-full justify-between items-center py-1 px-0 pl-2">
    {children}
  </div>
);

const ListContainer: FC<UIComponentProps> = ({ children }) => (
  <div className=" py-3 px-2 [&:not(:has(*))]:hidden">{children}</div>
);

const InputContainer: FC<UIComponentProps> = ({ children }) => (
  <div className="p-2">{children}</div>
);

const CabinList: FC<UIComponentProps> = ({ children }) => (
  <ul className="w-full flex flex-col gap-1">{children}</ul>
);

const CabinItem: FC<UIComponentProps> = ({ children }) => (
  <li className="flex items-center justify-between rounded-sm border border-solid border-gray-700 py-1 px-3">
    {children}
  </li>
);

const ItemOptions: FC<UIComponentProps> = ({ children }) => (
  <div className="flex py-0.5 px-0 gap-4">{children}</div>
);

interface LabelProps {
  children: ReactNode;
}

const Label: FC<LabelProps> = ({ children }) => (
  <label className="font-semibold">{children}</label>
);

const customStyles = {
  menu: (styles) => ({
    ...styles,
    maxHeight: "100px",
    overflowY: "auto",
    backgroundColor: "var(--color-white)",
    color: "var(--color-gray-700)",
    border: "2px solid var(--color-gray-100)",
  }),
  input: (styles) => ({
    ...styles,
    color: "var(--color-gray-600)",
  }),
  control: (styles) => ({
    ...styles,
    color: "var(--color-gray-700)",
    borderRadius: "var(--radius-md)",
    backgroundColor: "var(--color-white)",
    boxShadow: "var(--radius-sm)",
  }),
  option: (styles) => ({
    ...styles,
    color: "var(--color-gray-700)",
    backgroundColor: "var(--color-white)",
    border: "1px solid var(--color-gray-100)",
  }),
};

// ------------ COMPONENT ------------

interface BookingCabinsSelectProps {
  cabinsToEdit?: CabinModel[];
  onUpdateCabins: (cabins: CabinModel[]) => void;
}

const BookingCabinsSelect: FC<BookingCabinsSelectProps> = ({
  onUpdateCabins,
  cabinsToEdit,
}) => {
  // const [selectedPrimrayColor, setSelectedPrimaryColor] = useState(null);
  const [selectedCabins, setSelectedCabins] = useState<CabinModel[]>(
    cabinsToEdit ?? ([] as CabinModel[])
  );
  const [showSelect, setShowSelect] = useState<boolean>(false);
  // const setSearchTextDebounced = useRef(
  //   debounce((searchText) => setSearchText(searchText), 500)
  // ).current;

  const { isPending, cabins: cabinOptions } = useCabins();

  useEffect(() => {
    onUpdateCabins(selectedCabins);
  }, [selectedCabins]);

  const handleToggleSelect = () => {
    setShowSelect((current) => !current);
  };

  const handleAddCabin = (cabin: CabinModel) => {
    setSelectedCabins((current) => [
      ...current,
      {
        ...cabin,
      },
    ]);
  };

  const handleDeleteCabin = (cabinId: number) => {
    setSelectedCabins((current) =>
      current.filter((cabin) => cabin.id !== cabinId)
    );
  };

  const handleChangePrimary = (selectedItem, event) => {
    if (selectedItem !== null) {
      const selected = cabinOptions?.filter(
        (cabin) => cabin.id == selectedItem.value
      )[0];
      if (selected) {
        handleAddCabin(selected);
      }

      handleToggleSelect();
    }
  };

  const filteredCabinsOptions = cabinOptions?.filter(
    (supply) =>
      !selectedCabins
        .reduce((acc, curr) => {
          acc.push(curr.id);
          return acc;
        }, [] as number[])
        .includes(supply.id)
  );

  return (
    <>
      <LabelContainer>
        <Label>Cabins:</Label>
        <ButtonIcon onClick={handleToggleSelect}>
          {showSelect ? <HiOutlineXMark /> : <HiOutlinePlus />}
        </ButtonIcon>
      </LabelContainer>
      <ListContainer>
        <CabinList>
          {selectedCabins.map((cabin) => (
            <CabinItem key={`selected-cabin-${cabin.name}-${cabin.id}`}>
              <p>{`CBN-${cabin.id}`}</p>
              <ItemLabel>{cabin.name}</ItemLabel>
              <ItemLabel>
                <span>Max Cap. </span>
                {cabin.maxCapacity}
              </ItemLabel>
              <ItemOptions>
                <ButtonIcon onClick={() => handleDeleteCabin(cabin.id)}>
                  <HiOutlineXMark color="var(--color-red-400)" />
                </ButtonIcon>
              </ItemOptions>
            </CabinItem>
          ))}
        </CabinList>
      </ListContainer>
      <InputContainer>
        {showSelect && (
          <ReactSelect
            autoFocus
            noOptionsMessage={() => "Cabins not found."}
            placeholder={"Search for a cabin"}
            isLoading={isPending}
            options={
              filteredCabinsOptions?.map((c) => ({
                label: c.name,
                value: c.id,
              })) ?? []
            }
            onChange={handleChangePrimary}
            styles={customStyles}
          />
        )}
      </InputContainer>
    </>
  );
};

export default BookingCabinsSelect;
