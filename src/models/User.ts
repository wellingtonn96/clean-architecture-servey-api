import { Schema, Document, model } from 'mongoose'

export interface IUser extends Document {
  _id: string
  name: string
  email: string
  password: string
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const UserModel = model('User', UserSchema)
