import { Request, Response } from "express";
import { z } from 'zod'
import { userRepository } from "../repositories/userRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { env } from "../env";

export class AuthController {
  async create(request: Request, response: Response) {
    const getUserBodySchema = z.object({
      email: z.string(),
      password: z.coerce.string()
    })

    const { email, password } = getUserBodySchema.parse(request.body)

    const user = await userRepository.findOneBy({ email })

    if(!user) {
      return response.sendStatus(400)
    }

    const verifyPassword = await compare(password, user.password)

    if(!verifyPassword) {
      return response.sendStatus(400)
    }

    const token = sign({ id: user.id }, env.JWT_PASSWORD, { expiresIn: '1d' })

    return response.status(200).json({
      message: 'Usuário logado com sucesso.',
      token
    })
  }

  async index(request: Request, response: Response) {
    const userTest = request.user

    return response.status(200).json({
      authenticatedUser: userTest
    })
  }
}