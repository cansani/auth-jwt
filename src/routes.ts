import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";
import { authMiddleware } from "./middlewares/authMiddleware";

export const routes = Router()

routes.post('/register', new UserController().create)
routes.post('/signin', new AuthController().create)

routes.get('/infos', authMiddleware, new AuthController().index)