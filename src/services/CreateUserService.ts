import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(data: IUser): Promise<IUser> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw Error("User with this email already exists!");
    }

    const user = {
      ...data,
      password: await bcrypt.hash(data.password, 12),
    };

    //@ts-ignore
    return this.userRepository.create(user);
  }
}

export default CreateUserService;
