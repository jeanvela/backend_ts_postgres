import { Router } from "express";
import { signUp, signIn, verify } from "../controllers/auth.controller";
import { schemaValidation } from "../middleware/schemaValidator";
import { signupSchema, signinSchema } from "../schemas/authSchemas";
import { verifyToken } from "../middleware/verifyToken";

const router = Router()

router.post('/sign-up', schemaValidation(signupSchema), signUp)
router.post('/sign-in', schemaValidation(signinSchema), signIn)
router.get('/verify', verifyToken, verify)

export default router