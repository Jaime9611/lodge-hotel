import { UpdateSettingsForm } from "@features/settings";
import { Heading } from "@ui/atoms";
import { Row } from "@ui/atoms/Row";

const Settings = () => (
  <>
    <Row>
      <Heading as="h1">Settings</Heading>
    </Row>
    <Row type="vertical">
      <div className="max-w-lg">
        <UpdateSettingsForm />
      </div>
    </Row>
  </>
);

export default Settings;
