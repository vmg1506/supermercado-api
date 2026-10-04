import { DataTypes } from "sequelize";
import sequelize from "../db.js";


export const Sale = sequelize.define('Sale', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
    },

    total: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'sales',
    timestamps: false
})