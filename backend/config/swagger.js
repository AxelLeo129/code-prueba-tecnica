const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definir opciones para Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Code Prueba Técnica',
      version: '1.0.0',
      description: 'API Code Prueba Técnica'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: ['./routes/*.js'] // Buscar documentación en las rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
