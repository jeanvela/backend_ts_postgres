import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, VerifyOptions, VerifyErrors } from 'jsonwebtoken';
import { jwtConfig } from "../config/jwtConfig";

type TokenError = VerifyErrors | null

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace("Bearer ", "")
    console.log(token)
    try {
        if (!token) throw new Error("No token, authorization denied")
        const options: VerifyOptions = {
            algorithms: ["HS256"],
            ignoreExpiration: false,
            complete: false
        }
        jwt.verify(token, jwtConfig.jwtSecret, options, (err: TokenError, user:any) => {
            if (err) throw new Error("Invalid token")
            req.user = user
            next()
        })
    } catch (error) {
        if (error instanceof JsonWebTokenError) return res.status(401).json({message: error.message})
        return res.status(500).json({message: "Internal server error"})
    }
}