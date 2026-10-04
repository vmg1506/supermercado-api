import { DataTypes } from "sequelize";
import sequelize from "../db.js";


export const SaleDetail= sequelize.define('SaleDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    saleId: {
        type: DataTypes.INTEGER,
        field: 'sale_id'
    },

    productId: {
        type: DataTypes.INTEGER,
        field: 'product_id'
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'sale_details',
    timestamps: false
})