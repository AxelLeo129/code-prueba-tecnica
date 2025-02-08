const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const couponRoutes = require('./routes/coupon.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/coupons', couponRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
}).catch(err => console.log('Error al conectar con la base de datos:', err));
