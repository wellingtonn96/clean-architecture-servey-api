import { Model } from "mongoose";
import { UserModel, IUser } from "../models/User";

class UserRepository {
  private users: Model<IUser>;

  constructor() {
    this.users = UserModel;
  }

  public async findById(id: string) {
    return this.users.findOne({
      _id: id,
    });
  }

  public async findByEmail(email: string) {
    return this.users.findOne({
      email: email,
    });
  }

  public async create(data: IUser): Promise<IUser> {
    const results = await this.users.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    console.log(results);

    return results;
  }
}

export default UserRepository;
