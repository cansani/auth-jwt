import { Request, Response } from "express";
import { z } from 'zod'
import { userRepository } from "../repositories/userRepository";
import { hash } from "bcrypt";

export class UserController {
  async create(request: Request, response: Response) {
    const getUserBodySchema = z.object({
      email: z.string(),
      password: z.coerce.string()
    })

    const { email, password } = getUserBodySchema.parse(request.body)

    const userExists = await userRepository.findOneBy({ email })

    if (userExists) {
      return response.sendStatus(400)
    }

    const hashPassword = await hash(password, 6)

    const user = userRepository.create({
      email, 
      password: hashPassword
    })

    await userRepository.save(user)

    return response.status(201).json({
      message: 'Usuário criado com sucesso.'
    })
    
  }
}