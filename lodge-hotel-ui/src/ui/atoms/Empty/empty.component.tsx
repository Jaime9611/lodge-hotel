import type { FC } from "react";

interface EmptyProps {
  resource: string;
}

const Empty: FC<EmptyProps> = ({ resource }) => {
  return <p>No {resource} could be found.</p>;
};

export default Empty;
