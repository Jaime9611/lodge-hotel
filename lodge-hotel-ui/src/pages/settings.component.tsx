import { UpdateSettingsForm } from "@features/settings";
import { Heading } from "@ui/atoms";
import { Row } from "@ui/atoms/Row";

const Settings = () => (
  <>
    <Row>
      <Heading as="h1">Settings</Heading>
    </Row>
    <Row type="vertical">
      <UpdateSettingsForm />
    </Row>
  </>
);

export default Settings;
