import { Router } from "express";
import { allUsers, updateStatusUser, userById } from "../controllers/admin.controller";
import { verifyToken } from "../middleware/verifyToken";
import { rolValidation } from "../middleware/rolValidation";

const router = Router()

router.get("/user", verifyToken, rolValidation, allUsers)
router.patch("/user/:id", verifyToken, rolValidation, updateStatusUser)
router.get("/user/:id", verifyToken, rolValidation, userById)

export default router