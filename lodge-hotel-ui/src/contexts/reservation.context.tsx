import { addDays } from "date-fns";
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

interface ReservationState {
  range: { from: Date; to: Date };
  setRange: React.Dispatch<
    React.SetStateAction<{
      from: Date | undefined;
      to: Date | undefined;
    }>
  >;
  resetRange: () => void;
}

// ------------------------------ CONTEXT --------------------------------------
const ReservationContext = createContext<ReservationState>(
  {} as ReservationState
);

const initialState = { from: undefined, to: undefined };

// ------------------------------ PROVIDER --------------------------------------

interface ReservationProviderProps {
  children: ReactNode;
}

const ReservationProvider: FC<ReservationProviderProps> = ({ children }) => {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
