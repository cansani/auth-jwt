import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
  id: string
}

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers

   if(!authorization || authorization === 'Bearer') {
    return response.sendStatus(401)
  }
  
  const token = authorization.split(' ')[1]

  const { id } = verify(token, env.JWT_PASSWORD) as JwtPayload

  const userExists = await userRepository.findOneBy({ id })

  if(!userExists) {
    return response.sendStatus(401)
  }

  request.user = userExists

  next()
}