import { Suspense } from "react";
import { Filter, Spinner } from "@ui/atoms";
import CabinList from "./cabin-list.component";

const Cabins = () => {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">Our Cabins</h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter
          filterField="capacity"
          options={[
            { value: "all", label: "All cabins" },
            { value: "small", label: "2-3 guests" },
            { value: "medium", label: "4-6 guests" },
            { value: "large", label: "6-8 guests" },
          ]}
        />
      </div>

      <Suspense fallback={<Spinner />} key="cabins-filtered-list">
        <CabinList filter="medium" />
      </Suspense>
    </div>
  );
};

export default Cabins;
