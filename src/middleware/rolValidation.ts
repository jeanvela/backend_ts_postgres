import { Request, Response, NextFunction } from "express";

export function rolValidation(req: Request, res: Response, next: NextFunction) {
    const user = req.user
    try {
        if (user.rol.role !== "admin") return res.status(403).json({message: "Only an admin user can access this resource"})
        next()
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}