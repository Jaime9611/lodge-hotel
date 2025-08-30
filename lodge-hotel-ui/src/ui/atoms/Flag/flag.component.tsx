import type { FC } from "react";

interface FlagProps {
  src: string;
  alt: string;
}
const Flag: FC<FlagProps> = ({ src, alt }) => (
  <img
    className="max-w-8 rounded-xs block border border-solid border-gray-100"
    src={src}
    alt={alt}
  />
);

export default Flag;
