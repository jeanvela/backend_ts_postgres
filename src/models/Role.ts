import { DataTypes } from "sequelize";
import { sequelize } from "../db/db";

const Role = sequelize.define("roles", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user"
    }
})

export default Role