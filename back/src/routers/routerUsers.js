const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const {
  createUser,
  readAllUsers,
  deleteUser,
  findUser,
  findUserByEmail,
} = require('../controllers/controllerUsers');

const router = express.Router();
const upload = multer({ dest: 'imagenes/' });

const logPath = path.join(__dirname, '..', 'logs', 'bitacora.log');

function registrarLog(accion, datos) {
  const entrada = `[${new Date().toISOString()}] Acción: ${accion} | Datos: ${JSON.stringify(datos)}\n`;
  try {
    fs.appendFileSync(logPath, entrada);
  } catch (err) {
    console.error('❌ Error al escribir en bitácora:', err);
  }
}

// 📤 Crear usuario con imagen
router.post('/', upload.single('pfPicture'), async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username || !req.file) {
      registrarLog('Error por campos faltantes', req.body);
      return res.status(400).json({
        result: 'mistake',
        message: 'Todos los campos son obligatorios, incluyendo la imagen',
        data: null,
      });
    }

    req.body.pfPicture = req.file.filename;
    await createUser(req, res);
  } catch (err) {
    registrarLog('Error al crear usuario', { error: err.message });
    res.status(500).json({
      result: 'mistake',
      message: 'Error al crear usuario',
      data: err.message || err,
    });
  }
});

// 📥 Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    console.log('📥 GET /api/users ejecutado');
    await readAllUsers(req, res);
  } catch (err) {
    registrarLog('Error al consultar usuarios', { error: err.message });
    res.status(500).json({
      result: 'mistake',
      message: 'Error al obtener usuarios',
      data: err.message || err,
    });
  }
});

// 🗑️ Eliminar usuario por ID
router.delete('/:id', async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (err) {
    registrarLog('Error al eliminar usuario', { error: err.message });
    res.status(500).json({
      result: 'mistake',
      message: 'Error al eliminar usuario',
      data: err.message || err,
    });
  }
});

// 🔍 Buscar usuario por ID
router.post('/findUser', async (req, res) => {
  try {
    await findUser(req, res);
  } catch (err) {
    registrarLog('Error en findUser', { error: err.message });
    res.status(500).json({
      result: 'mistake',
      message: 'Error interno en findUser',
      data: err.message || err,
    });
  }
});

// 📧 Buscar usuario por email
router.post('/findUserByEmail', async (req, res) => {
  try {
    await findUserByEmail(req, res);
  } catch (err) {
    registrarLog('Error en findUserByEmail', { error: err.message });
    res.status(500).json({
      result: 'mistake',
      message: 'Error interno en findUserByEmail',
      data: err.message || err,
    });
  }
});

module.exports = router;