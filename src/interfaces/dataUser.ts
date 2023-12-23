export interface DataUser {
    id: number,
    name: string,
    email: string,
    password: string,
    status: boolean,
    role: {
        dataValues: {
            id: number,
            role: string
        }
    }
}