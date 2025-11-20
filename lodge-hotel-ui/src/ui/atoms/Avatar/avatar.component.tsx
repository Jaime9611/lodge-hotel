import type { FC } from "react";
import { Image } from "../Image";

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: FC<AvatarProps> = ({ src, alt }) => {
  return (
    <Image
      className="block w-16 aspect-ration-[1] object-cover object-center rounded-full outline-1 outline-gray-100"
      src={src}
      alt={alt}
    />
  );
};

export default Avatar;
