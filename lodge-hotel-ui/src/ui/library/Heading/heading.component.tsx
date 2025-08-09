import { type FC, type ReactNode } from "react";

type Headings = {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
};

const getHeading = (type: keyof Headings, children: ReactNode) => {
  switch (type) {
    case "h1":
      return <h1 className="text-5xl font-semibold leading-4">{children}</h1>;
    case "h2":
      return <h2 className="text-4xl font-semibold leading-4">{children}</h2>;
    case "h3":
      return <h3 className="text-4xl font-medium leading-4">{children}</h3>;
    case "h4":
      return (
        <h4 className="text-4xl font-medium text-center leading-6">
          {children}
        </h4>
      );
  }
};

interface HeadingProps {
  as: keyof Headings;
  children: ReactNode;
}

const Heading: FC<HeadingProps> = ({ as, children }) => {
  return getHeading(as, children);
};

export default Heading;
