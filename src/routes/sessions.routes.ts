import { Router } from "express";
import UserRepository from "../repositories/UserRepository";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

const sessionRouter = Router();

sessionRouter.post("/", async (request, response) => {
  try {
    const data = request.body;

    const authenticateUserService = new AuthenticateUserService(
      new UserRepository()
    );

    const authenticateUser = await authenticateUserService.execute({
      email: data.email,
      password: data.password,
    });

    return response.status(200).json({ data: authenticateUser });
  } catch (error) {
    // @ts-expect-error
    return response.status(401).json({ err: error.message });
  }
});

export { sessionRouter };
