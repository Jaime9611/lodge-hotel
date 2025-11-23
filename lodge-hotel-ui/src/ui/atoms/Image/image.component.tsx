import { useState, type FC } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className: string;
  type: "cabin" | "user";
}

const Image: FC<ImageProps> = ({ src, alt, className, type }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const defaultImage =
    type === "user" ? "default-user.jpg" : "default-cabin.jpg";

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <img
      src={error ? defaultImage : loading ? defaultImage : src}
      onError={handleError}
      onLoad={handleLoad}
      alt={error ? "Error" : alt}
      className={className}
    />
  );
};

export default Image;
