import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request; //disponível em index.d.ts, assim que o user logar

  const usersRepositories = getCustomRepository(UsersRepositories); //acessa o repositório UsersRepositories
  const { admin } = await usersRepositories.findOne(user_id); //faz um select em UsersRepositories, onde user_id seja igual e retorna o valor do campo admin (true/false)
  
  //verificar se usuário é admin
  
  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "Unauthorized",
  });
}
