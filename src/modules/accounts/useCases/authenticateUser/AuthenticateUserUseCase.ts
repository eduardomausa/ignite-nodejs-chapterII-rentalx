import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string,
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}


  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if(!user) {
      throw new AppError("Email or password are incorrect.")
    }

    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch) {
      throw new AppError("Email or password are incorrect.")
    }

    const token = sign({}, "dd47feb8a3f06c14c9cf2dfee000e190", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      }
    };
    
    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };