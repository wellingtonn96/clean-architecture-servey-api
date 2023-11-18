import SurveyRepository from '../repositories/SurveyRepository'

class CreateVoteService {
  private readonly surveyRepository: SurveyRepository;

  constructor (surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository
  }

  public async execute ({ answer, id }: { answer: string, id: string }) {
    const questionExists = await this.surveyRepository.getOne(id)

    if (questionExists == null) {
      throw new Error('This question not exists!')
    }

    // const answerExists = await this.surveyRepository.findByAnswer(answer, id);

    // console.log(answerExists);

    // if (!answerExists) {
    //   throw new Error("This answer not exists in this question!");
    // }

    return await this.surveyRepository.createVote({ answer, id })
  }
}

export default CreateVoteService
