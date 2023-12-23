import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwtConfig'
import { Iuser } from '../interfaces/user'

export function createdToken(user: Iuser) {
    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        rol: user.rol
    }, jwtConfig.jwtSecret, {
        expiresIn: 86400
    })
}