import { Request, Response } from "express";
import { MyError } from "../interfaces/myError";
import Role from "../models/Role";

export const allRole = async (req: Request, res: Response) => {
    try {
        const roles = await Role.findAll()
        return res.status(200).json(roles)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 400).json({message: myError.message})
    }
}

export const createdRol = async (req: Request, res: Response) => {
    const { role } = req.body
    try {
        const newRole = await Role.create({role})
        return res.status(201).json(newRole)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 400).json({message: myError.message})
    }
}