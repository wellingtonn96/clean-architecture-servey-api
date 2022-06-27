import { Router } from "express";
import UserRepository from "../repositories/UserRepository";
import CreateUserService from "../services/CreateUserService";

const userRouter = Router();

userRouter.post("/", async (request, response) => {
  try {
    const data = request.body;

    const createUserService = new CreateUserService(new UserRepository());

    const createSurvey = await createUserService.execute(data);

    return response.status(200).json(createSurvey);
  } catch (error) {
    //@ts-ignore
    return response.status(401).json({ err: error.message });
  }
});

export { userRouter };
