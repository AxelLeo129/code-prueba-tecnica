require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const sequelize = require('./config/database');3
const { swaggerUi, swaggerDocs } = require('./config/swagger');

const couponRoutes = require('./routes/coupon.routes');

const app = express();

/**
 * @file Servidor principal de la aplicación.
 * 
 * Configura y ejecuta el servidor Express, establece la conexión con la base de datos
 * y define las rutas de la API.
 */

/**
 * Middleware globales.
 * 
 * - `express.json()` permite el procesamiento de JSON en las solicitudes entrantes.
 * - `morgan('dev')` habilita el logging en modo desarrollo.
 * - `cors()` configura el middleware CORS para permitir solicitudes desde el frontend.
 */
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * Rutas de la API.
 * 
 * - `/api/coupons` gestiona las operaciones sobre cupones de descuento.
 * - `/api-docs` proporciona la documentación Swagger de la API.
 */ 
app.use('/api/coupons', couponRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * Inicialización del servidor y sincronización con la base de datos.
 * 
 * @async
 * @function
 * @returns {Promise<void>} Inicia el servidor en el puerto 3000.
 */
sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
}).catch(err => console.log('Error al conectar con la base de datos:', err));
