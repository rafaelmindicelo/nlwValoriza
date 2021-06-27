import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //receber o token
  const authToken = request.headers.authorization;

  //validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [,token] = authToken.split(" "); //o split (array) em authToken possui 2 posições, a vírgula "," ignora a primeira posição e guarda o conteúdo da 2ª posição na const "token"

  try {
    //validar se o token é válido
    const {sub} = verify(token, "a780bcd55cfb2d7224fc589316c1b0b7") as IPayload;

    //recuperar informações do usuário
    request.user_id = sub;
    return next();
  } catch (error) {
    return response.status(401).end();
  }


}
