const express = require('express');
const User = require('../models/modelUsers.js'); // Asegúrate de que User.js esté en src/models
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear usuario', detalles: err.message });
  }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
});

// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
  try {
    const usuarioActualizado = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!usuarioActualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(usuarioActualizado);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar usuario', detalles: err.message });
  }
});

// Eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
  try {
    const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;