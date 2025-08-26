const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const usersRouter = require('./src/routers/routerUsers');
const routerLogin = require('./src/routers/routerLogin');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas (solo si no estamos en test)
if (process.env.NODE_ENV !== 'test') {
  const mongoURI =
    process.env.MONGO_URI ||
    'mongodb+srv://proyectoredsocial2025:proyectoredsocial2025@cluster0.w0rqnvi.mongodb.net/redsocial?retryWrites=true&w=majority&appName=Cluster0';

  mongoose
    .connect(mongoURI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((err) => console.error('Error al conectar a Atlas:', err));
}

// Ruta del archivo de logs
const logPath = path.join(__dirname, 'logs', 'bitacora.log');

function registrarLog(mensaje) {
  const entrada = `[${new Date().toISOString()}] ${mensaje}\n`;
  try {
    fs.appendFileSync(logPath, entrada);
  } catch (err) {
    console.error('Error al escribir en bitácora:', err);
  }
}

app.post('/api/users/log', (req, res) => {
  const datos = req.body;
  registrarLog(`Usuario creado: ${JSON.stringify(datos)}`);
  res.status(201).json({ mensaje: 'Usuario registrado en bitácora' });
});

app.use('/api/users', usersRouter);
app.use('/api/login', routerLogin);

app.get('/', (req, res) => {
  res.status(200).send('Servidor activo');
});

app.use((req, res) => {
  res.status(404).json({
    result: 'mistake',
    message: 'Ruta no encontrada',
    path: req.originalUrl,
  });
});

// Solo levantar el servidor si se ejecuta directamente (no durante test)
if (require.main === module && process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;