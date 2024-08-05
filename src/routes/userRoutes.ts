import { Router } from "express";
import UserController from "../controllers/userController";
import AuthMiddleware from "../middleware/authMiddleware";
const router = Router();

router.get(
  "/me",
  AuthMiddleware.isAuthenticated,
  UserController.getCurrentUser
);
router.get(
  "/",
  AuthMiddleware.checkRoles(["role", "test"]),
  AuthMiddleware.checkPerms(["Permission 1"]),
  UserController.getAll
);
router.get(
  "/:id",
  AuthMiddleware.checkPerms(["Permission 1"]),
  UserController.getById
);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);
router.post("/:id/assign-roles", UserController.assignUserRole);

export default router;
