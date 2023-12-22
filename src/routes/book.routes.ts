import { Router } from "express";
import { allBooks, bookById, createdBook, ratingBook, updateBook, deleteBook } from "../controllers/book.controller";
import { verifyToken } from "../middleware/verifyToken";
import { schemaValidation } from "../middleware/schemaValidator";
import { bookCreatedSchema,bookUpdateSchema, bookRatingSchema, bookDeletedSchema } from "../schemas/bookSchema";

const router = Router()

router.get("/book", verifyToken, allBooks)
router.post("/book", verifyToken, schemaValidation(bookCreatedSchema), createdBook)
router.get("/book/:id", verifyToken, bookById)
router.put("/book/:id", verifyToken, schemaValidation(bookUpdateSchema), updateBook)
router.patch("/book/:id", verifyToken, schemaValidation(bookRatingSchema), ratingBook)
router.delete("/book/:id", verifyToken, schemaValidation(bookDeletedSchema), deleteBook)

export default router