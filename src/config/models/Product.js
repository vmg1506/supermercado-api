import { DataTypes } from "sequelize";
import sequelize from "../db.js";


export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: DataTypes.STRING,
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    providerId: {
        type: DataTypes.INTEGER,
        field: 'provider_id'
    }
}, {
    tableName: 'products',
    timestamps: false
})