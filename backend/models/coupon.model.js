const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Coupon = sequelize.define('Coupon', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, unique: true, allowNull: false },
    discount_percentage: { type: DataTypes.DECIMAL(5,2), allowNull: false },
    expiration_date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { 
    timestamps: false 
});

module.exports = Coupon;
