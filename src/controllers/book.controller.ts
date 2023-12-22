import { Request, Response } from "express";
import Book from "../models/Book";
import { MyError } from "../interfaces/myError";

export const allBooks = async (req: Request, res: Response) => {
    const user = req.user
    try {
        const books = await Book.findAll({
            where: {
                userId: user.id
            }
        })
        return res.status(200).json(books)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}
export const createdBook = async (req: Request, res: Response) => {
    const { title, author, rating } = req.body
    const user = req.user
    try {
        const isTitle = await Book.findOne({
            where: {
                title: title
            }
        })
        if (isTitle) throw new Error("This book already exists")
        const newBook = await Book.create({title, author, rating, userId: user.id})
        return res.status(201).json(newBook)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}

export const bookById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const oneBook = await Book.findByPk(id)
        if (!oneBook) throw new Error("Book not found")
        return res.status(200).json(oneBook)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}


export const updateBook = async (req: Request, res: Response) => {
    const { title, author, rating } = req.body
    const { id } = req.params
    try {
        const bookUpdate = await Book.update({title, author, rating}, {
            where: {
                id: id
            }
        })
        if (bookUpdate[0] === 0) throw new Error("Book not Update")
        return res.status(204).json({message: "Updated success"})
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}

export const ratingBook = async (req: Request, res: Response) => {
    const { id } = req.params
    const { rating } = req.body
    try {
        const updateRating = await Book.update({rating}, {
            where: {
                id: id
            }
        })
        if (updateRating[0] === 0) throw new Error("Book not update rating")
        return res.status(204).json({message: "Update rating"})
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const destroyBook = await Book.destroy({where: {id: id}})
        if (destroyBook === 0) throw new Error("Book not delete")
        return res.status(204).json({message: "deleted book success"})
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}