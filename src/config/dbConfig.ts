import dotenv from 'dotenv'
dotenv.config()

export const db = {
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbHost: process.env.DB_HOST || '',
    dbName: process.env.DB_NAME || '',
}