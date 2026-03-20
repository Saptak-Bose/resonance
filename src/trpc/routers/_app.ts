import { createTRPCRouter } from "../init";
import { voicesRouter } from "./voices";

export const appRouter = createTRPCRouter({
  voices: voicesRouter,
});
