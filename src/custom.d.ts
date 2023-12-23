declare namespace Express {
    export interface Request {
        user: {
            id: number,
            name: string,
            email: string,
            status: boolean,
            rol: {
                id: number,
                role: string
            }
        }
    }
}