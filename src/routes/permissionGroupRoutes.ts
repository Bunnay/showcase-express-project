import { Router } from "express";
import PermissionGroupController from "../controllers/permissionGroupController";
const router = Router();

router.get("/", PermissionGroupController.getAll);
router.get("/:id", PermissionGroupController.getById);
router.post("/", PermissionGroupController.create);
router.put("/:id", PermissionGroupController.update);
router.delete("/:id", PermissionGroupController.delete);

export default router;
