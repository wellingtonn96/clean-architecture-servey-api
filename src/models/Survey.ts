import { Schema, Document, model } from "mongoose";

export interface ISurvey extends Document {
  _id: string;
  question: string;
  answers: IAnswer[];
}

interface IAnswer {
  _id: string;
  image: string;
  answer: string;
  percent: number;
  count: number;
}

const SurveySchema = new Schema<ISurvey>(
  {
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        image: { type: String },
        answer: { type: String, required: true },
        percent: { type: Number, required: true },
        count: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const surveyModel = model("Survey", SurveySchema);
