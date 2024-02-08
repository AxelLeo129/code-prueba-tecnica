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
 *     summary: Generar un nuevo cupón de descuento
 *     tags: [Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "DESCUENTO50"
 *               discount_percentage:
 *                 type: number
 *                 example: 20
 *               expiration_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-31"
 *     responses:
 *       201:
 *         description: Cupón generado correctamente
 */
router.post('/', couponController.createCoupon);

/**
 * @swagger
 * /api/coupons/{code}:
 *   put:
 *     summary: Validar un cupón de descuento ingresado en la tienda
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del cupón
 *     responses:
 *       200:
 *         description: Cupón válido con el porcentaje de descuento
 *       404:
 *         description: Cupón inválido o expirado
 */
router.put('/:code', couponController.validateCoupon);

module.exports = router;
