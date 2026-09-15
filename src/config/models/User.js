import { DataTypes } from "sequelize";
import sequelize from "../db.js";


export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unque: true
    },
    role: { 
        type: DataTypes.STRING,
        defaultType: 'client'
    }
}, {
    tableName: 'users',
    timestamps: false
})