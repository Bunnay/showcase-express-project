import { Router } from "express";
import PermissionController from "../controllers/permissionController";
const router = Router();

router.get("/", PermissionController.getAll);
router.get("/:id", PermissionController.getById);
router.post("/", PermissionController.create);
router.put("/:id", PermissionController.update);
router.delete("/:id", PermissionController.delete);

export default router;
