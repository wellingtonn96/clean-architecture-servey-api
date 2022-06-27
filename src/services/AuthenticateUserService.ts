import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { jwt } from "../config/auth";

class AuthenticateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("incorrect email/password combination");
    }

    const passwordMached = await bcrypt.compare(password, user.password);

    if (!passwordMached) {
      throw new Error("incorrect email/password combination");
    }

    const token = sign({}, jwt.secret, {
      subject: user._id.toString(),
      expiresIn: jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
