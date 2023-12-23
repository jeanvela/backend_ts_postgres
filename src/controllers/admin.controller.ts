import { Request, Response } from "express";
import { MyError } from "../interfaces/myError";
import { User } from "../models/User";
import Role from "../models/Role";

export const allUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Role,
                    attributes: ["id", "role"]
                }
            ]
        })
        return res.status(200).json(users)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 400).json({message: myError.message})
    }
}

export const updateStatusUser = async (req: Request, res:Response) => {
    const { status } = req.body
    const { id } = req.params
    try {
        const statusUpdate = await User.update({status}, {
            where: {
                id: id
            }
        })
        if (statusUpdate[0] === 0) throw new Error("User not found")
        return res.status(204).json({message: "Updates user status success"})
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}

export const userById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Role,
                    attributes: ["id", "role"]
                }
            ]
        })
        if (!user) throw new Error("User not found")
        return res.status(200).json(user)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}