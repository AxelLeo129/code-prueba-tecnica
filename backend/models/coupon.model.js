const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @file Modelo de datos para la entidad `Coupon`.
 * 
 * Este módulo define la estructura de la tabla `coupons`,
 * incluyendo los atributos de cada cupón de descuento.
 */

/**
 * Modelo de la entidad `Coupon`.
 * 
 * Representa un cupón de descuento que puede ser utilizado en la tienda online.
 * 
 * @constant
 * @type {import('sequelize').Model}
 * @property {number} id - Identificador único del cupón (autoincremental).
 * @property {string} code - Código único del cupón (requerido).
 * @property {number} discount_percentage - Porcentaje de descuento asociado al cupón.
 * @property {Date} expiration_date - Fecha de expiración del cupón.
 * @property {boolean} status - Estado del cupón (`true` para activo, `false` para inactivo).
 */
const Coupon = sequelize.define('coupons', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, unique: true, allowNull: false },
    discount_percentage: { type: DataTypes.DECIMAL(5,2), allowNull: false },
    expiration_date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { 
    timestamps: false 
});

/**
 * Exporta el modelo `Coupon` para su uso en la aplicación.
 * 
 * @module Coupon
 * @type {import('sequelize').Model}
 */
module.exports = Coupon;
