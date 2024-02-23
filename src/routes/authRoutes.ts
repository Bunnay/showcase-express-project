import express from "express";
import AuthController from "../controllers/authController";
import AuthMiddleware from "../middleware/authMiddleware";
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refreshToken);
// router.post("/password/forgot", AuthController.forgotPassword);
// router.post("/password/reset", AuthController.resetPassword);

export default router;
