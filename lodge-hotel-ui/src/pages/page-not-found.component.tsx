import { useMoveBack } from "@hooks";
import { Button, Heading } from "@ui/atoms";

const PageNotFound = () => {
  const moveBack = useMoveBack();

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center p-16">
      <div className="bg-white border border-solid border-gray-100 rounded-md p-16 flex-[0_1_96rem] text-center [&_h1]:mb-12">
        <Heading as="h1">
          The page you are looking for could not be found 🏠
        </Heading>
        <Button onClick={moveBack} size="large">
          &larr; Go back
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
