import { setupWorker } from "msw";
import { handlers } from "./handlers";

// Setup a worker for the dev environment (Broswer)
export const worker = setupWorker(...handlers);

worker.printHandlers();
