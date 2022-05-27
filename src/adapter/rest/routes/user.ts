import { UserController } from "../UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Router } from "express";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/", (req, res, next) =>
    userController.createUser(req, res, next)
);

/**
 * @swagger
 * /:
 *  get:
 *    description: Obtém a lista de usuários
 *    responses:
 *      '200':
 *        description: Usuários obtidos com sucesso
 */
userRouter.get("/", (req, res, next) =>
    userController.getAllUsers(req, res, next)
);

export default userRouter;
