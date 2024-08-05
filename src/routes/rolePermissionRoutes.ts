import { Router } from "express";
import RolePermissionController from "../controllers/rolePermissionController";
const router = Router();

router.get("/select", RolePermissionController.getSelectedRolesPermissions);
router.post("/update", RolePermissionController.assignRolesPermissions);

export default router;
