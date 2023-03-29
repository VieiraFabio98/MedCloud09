import { Router } from "express";
import { AuthenticateController } from "../../modules/token/useCase/authenticate/AuthenticateController"
import { RefreshTokenController } from "../../modules/token/useCase/refreshToken/RefreshTokenController";

const authenticateRoutes = Router()

const authenticateController = new AuthenticateController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post("/sessions", authenticateController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes }