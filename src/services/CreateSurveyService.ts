import SurveyRepository from "../repositories/SurveyRepository";

interface Answer {
  image: string;
  answer: string;
  percent: number;
  count: number;
}

interface SurveyData {
  id: number;
  question: string;
  answers: Answer[];
}

class CreateSurveyService {
  private surveyRepository: SurveyRepository;

  constructor(surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository;
  }

  public execute(data: SurveyData) {
    //@ts-ignore
    return this.surveyRepository.create(data);
  }
}

export default CreateSurveyService;
