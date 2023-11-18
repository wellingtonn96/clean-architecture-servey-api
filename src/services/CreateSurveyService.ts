import SurveyRepository from '../repositories/SurveyRepository'

interface Answer {
  image: string
  answer: string
  percent: number
  count: number
}

interface SurveyData {
  id: number
  question: string
  answers: Answer[]
}

class CreateSurveyService {
  private readonly surveyRepository: SurveyRepository;

  constructor (surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository
  }

  public async execute (data: SurveyData) {
    // @ts-expect-error
    return await this.surveyRepository.create(data)
  }
}

export default CreateSurveyService
