import UserRepository from '../repositories/UserRepository'
import bcrypt from 'bcrypt'

export interface IUser {
  _id: string
  name: string
  email: string
  password: string
}

class CreateUserService {
  private readonly userRepository: UserRepository;

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async execute (data: IUser): Promise<IUser> {
    const userExists = await this.userRepository.findByEmail(data.email)

    if (userExists != null) {
      throw Error('User with this email already exists!')
    }

    const user = {
      ...data,
      password: await bcrypt.hash(data.password, 12)
    }

    // @ts-expect-error
    return await this.userRepository.create(user)
  }
}

export default CreateUserService
