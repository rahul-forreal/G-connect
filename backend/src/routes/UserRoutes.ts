import { Router } from "express";
import { userController } from "../container/container";

const router = Router();

router.post("/users", userController.createUser);

router.get("/users", userController.getAllUsers);

router.get("/users/:id", userController.getUser);

router.patch("/users/:id", userController.updateUser);

router.delete("/users/:id", userController.deleteUser);

export default router;