const Coupon = require('../models/coupon.model');
const { Op } = require('sequelize');

/**
 * Generar un nuevo cupón de descuento.
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
 * Validar un cupón ingresado en la tienda.
 */
exports.validateCoupon = async (req, res) => {
    try {
        const { code } = req.params;
        const coupon = await Coupon.findOne({ where: { code, status: true, expiration_date: { [Op.gt]: new Date() } } });

        if (!coupon) {
            return res.status(404).json({ message: 'Cupón inválido o expirado' });
        }

        res.json({ valid: true, discount: coupon.discount_percentage });
    } catch (error) {
        res.status(500).json({ message: 'Error al validar el cupón', error });
    }
};
