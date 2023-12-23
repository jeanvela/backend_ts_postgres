import { Router } from "express";
import { allRole, createdRol } from "../controllers/role.controller";

const router = Router()

router.get("/rol", allRole)
router.post("/rol", createdRol)

export default router