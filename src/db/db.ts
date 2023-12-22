import { Sequelize } from 'sequelize'
import { db } from '../config/dbConfig'

export const sequelize = new Sequelize(db.dbName, db.dbUser, db.dbPassword, {
    host: 'localhost',
    dialect: 'postgres'
})