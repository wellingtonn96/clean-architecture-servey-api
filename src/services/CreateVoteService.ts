import SurveyRepository from "../repositories/SurveyRepository";

class CreateVoteService {
  private surveyRepository: SurveyRepository;

  constructor(surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository;
  }

  public async execute({ answer, id }: { answer: string; id: string }) {
    const questionExists = await this.surveyRepository.getOne(id);

    if (!questionExists) {
      throw new Error("This question not exists!");
    }

    // const answerExists = await this.surveyRepository.findByAnswer(answer, id);

    // console.log(answerExists);

    // if (!answerExists) {
    //   throw new Error("This answer not exists in this question!");
    // }

    return this.surveyRepository.createVote({ answer, id });
  }
}

export default CreateVoteService;
