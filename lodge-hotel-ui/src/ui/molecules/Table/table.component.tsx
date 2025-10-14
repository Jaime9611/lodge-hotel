import {
  useContext,
  type FC,
  type ReactNode,
  type JSX,
  createContext,
  type ReactElement,
} from "react";

// ------------ CONTEXT ------------
interface TableState {
  columns: string;
}

const TableContext = createContext({} as TableState);

// ------------ CHILDREN COMPONENTS ------------

interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <div
      role="row"
      style={{ display: "grid", gridTemplateColumns: columns }}
      className="py-6 px-8 bg-gray-50 border-b border-solid border-b-gray-50 uppercase tracking-tight font-semibold text-gray-600 gap-8 items-center"
    >
      {children}
    </div>
  );
};

interface BodyProps<T extends unknown> {
  data: T[] | undefined;
  render: (data: T) => JSX.Element;
}

const Body = <T,>({ data, render }: BodyProps<T>) => {
  if (data?.length === 0 || data === undefined)
    return (
      <p className="text-2xl font-medium text-center m-8">
        No data in this moment.
      </p>
    );

  return <section className="my-1.5 mx-0">{data.map(render)}</section>;
};

interface RowProps {
  children: ReactNode;
}

const Row: FC<RowProps> = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: columns }}
      className="py-4 px-8 border-solid border-b border-b-gray-100 last:border-b-0 gap-8 items-center"
    >
      {children}
    </div>
  );
};

interface FooterProps {
  children: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <div
      role="row"
      className="bg-gray-50 flex justify-center p-5 [&:not(:has(*))]:hidden"
    >
      {children}
    </div>
  );
};

// ------------ PARENT COMPONENT ------------
interface TableProps {
  columns: string;
  children: ReactNode;
}

interface TableComponent<T> extends ReactElement, FC<TableProps> {
  Header: FC<HeaderProps>;
  Body: FC<BodyProps<T>>;
  Row: FC<RowProps>;
  Footer: FC<FooterProps>;
}

const Table = <T,>({
  columns,
  children,
}: TableProps): Omit<
  TableComponent<T>,
  "Header" | "Body" | "Row" | "Footer"
> => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="border border-solid border-gray-200 text-md bg-white rounded-md overflow-hidden">
        {children}
      </div>
    </TableContext.Provider>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
