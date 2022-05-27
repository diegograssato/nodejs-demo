import { AuthController } from "../AuthController";
import { Router } from "express";

const authRouter = Router();

const authController = new AuthController();

authRouter.post("/login", (req, res, next) =>
    authController.login(req, res, next)
);

export default authRouter;
