import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { HiUsers } from "react-icons/hi2";

import type { CabinModel } from "@models";
import { Image } from "@ui/atoms";

interface CabinCardProps {
  cabin: CabinModel;
}

const CabinCard: FC<CabinCardProps> = ({ cabin }) => {
  const { id, name, regularPrice, maxCapacity, image, discount } = cabin;

  return (
    <div className="flex border-gray-500 border bg-gray-50 rounded-md">
      <div className="flex-1 relative">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          type="cabin"
          className="object-cover border-r border-gray-800 h-[250px] w-full"
        />
      </div>

      <div className="flex flex-col flex-2">
        <div className="pt-5 pb-4 px-7 bg-gray-50">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            {name}
          </h3>

          <div className="flex gap-3 items-center mb-12">
            <HiUsers className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-black-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-black-200">/ night</span>
          </p>
        </div>

        <div className="bg-gray-50 flex align-bottom justify-end">
          <NavLink
            to={`/landing/${id}`}
            className=" border-l border-primary-800 border-t text-primary-700 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-gray-900"
          >
            Details & reservation &rarr;
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CabinCard;
