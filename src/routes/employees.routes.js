import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

// GET all Users
router.get("/usuarios", getUsers);

// GET An User
router.get("/usuario/:documentNumber", getUser);

// DELETE An Employee
router.delete("/usuario/:documentNumber", deleteUser);

// INSERT An Employee
router.post("/usuario", createUser);

router.patch("/employees/:id", updateEmployee);

export default router;
