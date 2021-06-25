import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const user = await usersRepositories.findOne({email});

    if (!user) {
      throw new Error("Email incorrect");
    }

    //compare -> compara a senha digitada com a senha (hash) salva no banco
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Password incorrect");
    }

    const token = sign(
      {
        email: user.email, //payload
      },
      "a780bcd55cfb2d7224fc589316c1b0b7", //chave md5 criada aleatoriamente
      {
        subject: user.id,
        expiresIn: "1d", //tempo de expiração do token -> 1 dia
      }
    );
    return token;
  }
}

export { AuthenticateUserService };
