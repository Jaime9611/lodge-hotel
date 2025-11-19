import { setupServer } from "msw/node";
import { handlers as loginHandlers } from "./login-handlers";
import { handlers as settingsHandlers } from "./settings-handlers";
import { handlers as imageHandlers } from "./image-handlers";
import { handlers as userHandlers } from "./user-handlers";
import { handlers as cabinHandlers } from "./cabin-handlers";

export const server = setupServer(
  ...loginHandlers,
  ...settingsHandlers,
  ...imageHandlers,
  ...userHandlers,
  ...cabinHandlers
);
