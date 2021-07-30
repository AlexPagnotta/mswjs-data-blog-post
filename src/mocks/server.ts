import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Setup a worker for the test environment (Node)
export const server = setupServer(...handlers);
