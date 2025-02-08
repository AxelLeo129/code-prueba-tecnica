const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Endpoints para la gestión de cupones de descuento
 */

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Generar un nuevo cupón de descuento.
 *     tags: [Coupons]
 */
router.post('/', couponController.createCoupon);

/**
 * @swagger
 * /api/coupons/{code}:
 *   get:
 *     summary: Validar un cupón de descuento ingresado en la tienda.
 *     tags: [Coupons]
 */
router.get('/:code', couponController.validateCoupon);

module.exports = router;
