import { Request, Response } from 'express'
import { User } from '../models/User'
import { hashPassword, comparePassword } from '../utils/password'
import { createdToken } from '../utils/token'
import { DataUser } from '../interfaces/dataUser'
import { MyError } from '../interfaces/myError'

export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    try {
        const isEmail = await User.findOne({
            where: {
                email: email
            }
        })
        if (isEmail) throw new Error("this email is already in use")
        const passwordHash = await hashPassword(password)
        await User.create({name, email, password: passwordHash})
        return res.status(201).json({message: "User created" })
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 400).json({message: myError.message})
    }
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        let isUser = await User.findOne({
            where: {
                email: email
            }
        })
        if (!isUser) throw new Error("Invalid Email")
        const user: DataUser = isUser.get()
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) throw new Error("Invalid password")
        const token = createdToken({id: user.id, name: user.name, email})
        return res.status(200).set("Authorization", `Bearer ${token}`).json({
            id: user.id,
            name: user.name,
            email,
            token
        })
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 400).json({message: myError.message})
    }
}

export const verify = async (req: Request, res: Response) => {
    const user = req.user
    try {
        const oneUser = await User.findByPk(user.id)
        if (!oneUser) throw new Error("User not found")
        const userData = oneUser?.get()
        return res.status(200).json({
            id: userData.id,
            name: userData.name,
            email: userData.email
        })
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 401).json({message: myError.message})
    }
} 