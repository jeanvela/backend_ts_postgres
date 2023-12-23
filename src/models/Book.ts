import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { User } from "./User";

const Book = sequelize.define('books', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 10
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    }
})

Book.belongsTo(User, { foreignKey: "userId" })
User.hasMany(Book, { foreignKey: "userId" })

export default Book