import { Router } from "express";
import NotificationController from "../controllers/notificationController";
const router = Router();

router.get("/", NotificationController.getAll);
router.get("/:id", NotificationController.getById);
router.post("/", NotificationController.create);

export default router;
