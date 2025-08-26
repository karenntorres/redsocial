const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const User = require('../models/modelUsers');

// Función para generar contraseña aleatoria
function generateRandomPassword() {
  return crypto.randomBytes(6).toString('hex');
}

// Función para registrar logs
function registrarLog(action, data) {
  const logPath = path.join(__dirname, '..', 'logs', 'audit.log');
  const logEntry = `${new Date().toISOString()} - Acción: ${action} - Datos: ${JSON.stringify(data)}\n`;
  fs.appendFileSync(logPath, logEntry);
}

// Recuperar contraseña
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: 'Email address was not found in Database',
      });
    }

    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_NODE,
        pass: process.env.PASS_NODE,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_NODE,
      to: email,
      subject: 'Password recovery',
      text: `Hi ${user.name},\n\nyour new password is: ${newPassword}\n\nPlease change it after logging in\n\nGreetings,\nGlim Team.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'A new password has been sent to the registered email',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message || error,
    });
  }
}

// Controladores principales
async function createUser(req, res) {
  try {
    const { name, email, password, username, pfPicture } = req.body;

    if (!pfPicture) {
      return res.status(400).json({
        result: 'mistake',
        message: 'Profile picture is required',
        data: null,
      });
    }

    const passwordEncrypted = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: passwordEncrypted,
      username,
      pfPicture,
    });

    const createdUser = await newUser.save();

    registrarLog('Crear usuario', { name, email, username, pfPicture });

    res.json({
      result: 'All Fine',
      message: 'User has been created',
      data: createdUser._id,
    });
  } catch (error) {
    res.status(500).json({
      result: 'mistake',
      message: 'An error occurred while creating the user',
      data: error.message || error,
    });
  }
}

async function readUser(req, res) {
  try {
    const userFound = await User.findById(req.params.id);
    if (userFound) {
      res.json({
        result: 'All Fine',
        message: 'User has been found',
        data: userFound,
      });
    } else {
      res.status(404).json({
        result: 'mistake',
        message: 'User not found',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      result: 'mistake',
      message: 'An error occurred while reading the user',
      data: error.message || error,
    });
  }
}

async function readAllUsers(req, res) {
  try {
    const allUsersFound = await User.find();
    res.status(200).json(allUsersFound);
  } catch (error) {
    res.status(500).json({
      result: 'mistake',
      message: 'An error occurred while reading all users',
      data: error.message || error,
    });
  }
}

async function updateUser(req, res) {
  try {
    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (userUpdated) {
      registrarLog('Actualizar usuario', { id: req.params.id, cambios: req.body });
      res.json({
        result: 'All Fine',
        message: 'User info has been updated',
        data: userUpdated._id,
      });
    } else {
      res.status(404).json({
        result: 'mistake',
        message: 'User not found',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      result: 'mistake',
      message: 'An error occurred while updating the user info',
      data: error.message || error,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      registrarLog('Eliminar usuario', { id: req.params.id });
      res.json({
        result: 'All Fine',
        message: 'User has been deleted',
        data: null,
      });
    } else {
      res.status(404).json({
        result: 'mistake',
        message: 'User not found',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      result: 'mistake',
      message: 'An error occurred while deleting the user',
      data: error.message || error,
    });
  }
}

// Exportar todos los métodos
module.exports = {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
  forgotPassword,
};