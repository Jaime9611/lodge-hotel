import { Suspense } from "react";
import { Filter, Spinner } from "@ui/atoms";
import CabinList from "./cabin-list.component";

const Cabins = () => {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">Our Cabins</h1>
      <p className="text-primary-200 text-lg mb-10 text-justify">
        Enchanting highland retreats, perched in Colombia's majestic Andean
        mountains. Envision mornings greeted by mist-covered peaks and
        hummingbirds at your window, days spent wandering through colorful
        flower fields and charming pueblos, or evenings by the fireplace with
        panoramic mountain vistas. Discover the magic of Colombia's eternal
        spring in your cozy sanctuary. The ultimate escape for a peaceful,
        rejuvenating vacation. Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter
          filterField="capacity"
          options={[
            { value: "all", label: "All cabins" },
            { value: "small", label: "2-3 guests" },
            { value: "medium", label: "4-6 guests" },
            { value: "large", label: "7-8 guests" },
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
