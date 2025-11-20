import type { FC } from "react";
import { Image } from "../Image";

interface AvatarMiniProps {
  src: string;
  alt: string;
}

const AvatarMini: FC<AvatarMiniProps> = ({ src, alt }) => {
  return (
    <Image
      className="block w-8 aspect-ration-[1] object-cover object-center rounded-full outline-1 outline-gray-100"
      src={src}
      alt={alt}
      type="user"
    />
  );
};

export default AvatarMini;
