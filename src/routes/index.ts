import { Router } from "express";

import { surveyRouter } from "./survey.routes";
import { userRouter } from "./users.routes";
import { sessionRouter } from "./sessions.routes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routes = Router();

routes.use("/surveys", ensureAuthenticated, surveyRouter);
routes.use("/users", userRouter);
routes.use("/session", sessionRouter);

export default routes;
