const Coupon = require('../models/coupon.model');
const { Op } = require('sequelize');

/**
 * @file Controlador de cupones de descuento.
 * @module controllers/couponController
 */

/**
 * Genera un nuevo cupón de descuento y lo almacena en la base de datos.
 * 
 * @function
 * @async
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Responde con el cupón creado o un error en caso de fallo.
 * 
 * @example
 * // Petición POST a /api/coupons
 * {
 *   "code": "DESCUENTO50",
 *   "discount_percentage": 50,
 *   "expiration_date": "2025-12-31T23:59:59.999Z"
 * }
 */
exports.createCoupon = async (req, res) => {
    try {
        const { code, discount_percentage, expiration_date } = req.body;
        const newCoupon = await Coupon.create({ code, discount_percentage, expiration_date });
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cupón', error });
    }
};

/**
 * Valida un cupón ingresado en la tienda verificando si existe, si está activo y si no ha expirado.
 * Luego, actualiza su estado a inválido para evitar reutilización.
 * 
 * @function
 * @async
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>} Responde con la validez del cupón o los motivos de su invalidez.
 * 
 * @example
 * // Petición PUT a /api/coupons/DESCUENTO50
 * {
 *   "valid": true,
 *   "discount": 50
 * }
 */
exports.validateCoupon = async (req, res) => {
    try {
        const { code } = req.params;

        // Buscar el cupón en una sola consulta
        const coupon = await Coupon.findOne({ where: { code } });

        // Si el cupón no existe
        if (!coupon) {
            return res.status(404).json({ message: 'Cupón no encontrado', valid: false });
        }

        // Si el cupón ya está inactivo
        if (!coupon.status) {
            return res.status(400).json({ 
                message: 'Cupón inválido: ya ha sido utilizado',
                status: coupon.status 
            });
        }

        // Si el cupón ha expirado
        if (new Date(coupon.expiration_date) < new Date()) {
            return res.status(400).json({ 
                message: 'Cupón inválido: ha expirado',
                expiration_date: coupon.expiration_date 
            });
        }

        // Cambiar el estado del cupón a inválido después de su uso
        await coupon.update({ status: false });

        res.json({ valid: true, discount: coupon.discount_percentage });
    } catch (error) {
        res.status(500).json({ message: 'Error al validar el cupón', error });
    }
};
