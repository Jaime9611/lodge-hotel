import TodayItem from "./today-item.component";
import { useTodayActivity } from "./use-today-activity.hook";
import { Heading, Row, Spinner } from "@ui/atoms";

const TodayActivity = () => {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="bg-white border border-solid border-gray-100 rounded-md p-12 flex flex-col gap-9 col-start-1 col-span-2 pt-8">
      <Row>
        <Heading as="h2">Today Activity</Heading>
      </Row>
      {!isLoading ? (
        activities.length > 0 ? (
          <ul className="overflow-scroll overflow-x-hidden ">
            {activities?.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-2xl font-medium mt-3">
            No activities today...
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TodayActivity;
