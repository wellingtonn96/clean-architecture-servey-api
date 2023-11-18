import { Model } from 'mongoose'
import { surveyModel, ISurvey } from '../models/Survey'

class SurveyRepository {
  private readonly surveys: Model<ISurvey>;

  constructor () {
    this.surveys = surveyModel
  }

  public all () {
    return this.surveys.find()
  }

  public async findByAnswer (answer: string, id: string) {
    return await this.surveys.findOne({})
  }

  public async getOne (id: string) {
    return await this.surveys.findOne({
      _id: id
    })
  }

  public async create (data: ISurvey): Promise<any> {
    const results = await this.surveys.create({
      question: data.question,
      answers: data.answers
    })

    return results
  }

  public async createVote ({ answer, id }: { answer: string, id: string }) {
    const survey = await this.getOne(id)

    const updateSurvey =
      survey != null &&
      survey.answers.map((item) => {
        if (item.answer === answer) {
          return {
            image: item.image,
            answer: item.answer,
            count: item.count + 1,
            percent: parseInt(
              (
                ((item.count + 1) /
                  survey.answers.reduce((previous, current) => {
                    return previous + current.count
                  }, 1)) *
                100
              ).toString()
            )
          }
        }
        return {
          image: item.image,
          answer: item.answer,
          count: item.count,
          percent: parseInt(
            (
              (item.count /
                survey.answers.reduce((previous, current) => {
                  return previous + current.count
                }, 1)) *
              100
            ).toString()
          )
        }
      })

    const surveyUpdated = await this.surveys.updateOne(
      { _id: id },
      { $set: { answers: updateSurvey } }
    )

    return surveyUpdated
  }
}

export default SurveyRepository
