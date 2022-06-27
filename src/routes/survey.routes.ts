import { Router } from "express";
import SurveyRepository from "../repositories/SurveyRepository";
import CreateSurveyService from "../services/CreateSurveyService";
import CreateVoteService from "../services/CreateVoteService";

const surveyRouter = Router();

surveyRouter.post("/", async (request, response) => {
  try {
    const data = request.body;

    const createSurveyService = new CreateSurveyService(new SurveyRepository());

    const createSurvey = await createSurveyService.execute(data);

    return response.status(200).json(createSurvey);
  } catch (error) {
    //@ts-ignore
    return response.status(401).json({ err: error.message });
  }
});

surveyRouter.put("/:id/results", async (request, response) => {
  try {
    const { id } = request.params;
    const { answer } = request.body;

    const createVoteService = new CreateVoteService(new SurveyRepository());

    const createVote = await createVoteService.execute({ id, answer });

    return response.status(200).json(createVote);
  } catch (error) {
    //@ts-ignore
    return response.status(401).json({ err: error.message });
  }
});

surveyRouter.get("/", async (request, response) => {
  try {
    const surveyRepository = new SurveyRepository();

    const findAllSurveys = await surveyRepository.all();

    return response.status(200).json(findAllSurveys);
  } catch (error) {
    //@ts-ignore
    return response.status(401).json({ err: error.message });
  }
});

surveyRouter.get("/:id/results", async (request, response) => {
  try {
    const { id } = request.params;

    const surveyRepository = new SurveyRepository();

    const findSurvey = await surveyRepository.getOne(id);

    return response.status(200).json(findSurvey);
  } catch (error) {
    //@ts-ignore
    return response.status(401).json({ err: error.message });
  }
});

export { surveyRouter };
