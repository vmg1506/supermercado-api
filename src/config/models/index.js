import sequelize from "../db.js";
import { Product } from "./Product.js";
import { Provider } from "./Provider.js";
import { Sale } from "./Sale.js";
import { SaleDetail } from "./SaleDetail.js";
import { User } from "./User.js";


Provider.hasMany(Product, { foreignKey: 'providerId', as: 'products' })
Product.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider' })

User.hasMany(Sale, { foreignKey: 'userId', as: 'sales' })
Sale.belongsTo(User,  {foreignKey: 'userId', as: 'user'})

Sale.hasMany(SaleDetail, { foreignKey: 'saleId', as: 'details' })
SaleDetail.belongsTo(Sale, { foreignKey: 'saleId', as: 'sale' })

Product.hasMany(SaleDetail, { foreignKey: 'productId', as: 'saleDetails' })
SaleDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' })

export { sequelize, User, Provider, Product, Sale, SaleDetail }
