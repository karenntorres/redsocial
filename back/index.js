const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); // Para poder leer req.body

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://proyectoredsocial2025:proyectoredsocial2025@cluster0.w0rqnvi.mongodb.net/redsocial?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a Atlas:', err));

// Ruta del archivo de logs (fuera de src)
const logPath = path.join(__dirname, '..', 'logs', 'bitacora.log');

// Función para registrar logs
function registrarLog(mensaje) {
  const entrada = `[${new Date().toISOString()}] ${mensaje}\n`;
  fs.appendFileSync(logPath, entrada);
}

// Ruta directa para probar el log manualmente
app.post('/api/users/log', (req, res) => {
  const datos = req.body;
  registrarLog(`Usuario creado: ${JSON.stringify(datos)}`);
  res.status(201).send({ mensaje: 'Usuario registrado en bitácora' });
});

// Rutas externas
const usersRouter = require('./routers/routerUsers');
app.use('/api/users', usersRouter);

// Levantar el servidor (excepto en test)
if (process.env.NODE_ENV !== 'test') {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;