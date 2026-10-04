import { DataTypes } from "sequelize";
import sequelize from "../db.js";


export const Provider = sequelize.define('Provider', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    city: DataTypes.STRING
}, {
    tableName: 'providers',
    timestamps: false
})