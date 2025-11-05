import type { FC } from "react";

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: FC<AvatarProps> = ({ src, alt }) => {
  return (
    <img
      className="block w-16 aspect-ration-[1] object-cover object-center rounded-full outline-1 outline-gray-100"
      src={"default-user.jpg"}
      alt={alt}
    />
  );
};

export default Avatar;
