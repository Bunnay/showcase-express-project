import express from "express";
import PasswordController from "../controllers/passwordController";
const router = express.Router();

router.post("/forgot", PasswordController.forgotPassword);
router.post("/reset", PasswordController.resetPassword);

export default router;
