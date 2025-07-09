import bcrypt from "bcryptjs";
import modelUsers from "../models/modelUsers.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// CONTROLADOR PRINCIPAL
const controllerUsers = {
  createUser: async (req, res) => {
    try {
      const { name, email, password, username } = req.body;

      // Validar imagen
      if (!req.file) {
        return res.status(400).json({
          result: "mistake",
          message: "Profile picture is required",
          data: null,
        });
      }

      // Encriptar contraseña
      const passwordEncrypted = await bcrypt.hash(password, 10);

      // Crear usuario
      const newUser = new modelUsers({
        name,
        email,
        password: passwordEncrypted,
        username,
        pfPicture: req.file.filename,
      });

      const createdUser = await newUser.save();

      res.json({
        result: "All Fine",
        message: "User has been created",
        data: createdUser._id,
      });

    } catch (error) {
      res.status(500).json({
        result: "mistake",
        message: "An error occurred while creating the user",
        data: error.message || error,
      });
    }
  },

  readUser: async (req, res) => {
    try {
      const userFound = await modelUsers.findById(req.params.id);
      if (userFound) {
        res.json({
          result: "All Fine",
          message: "User has been found",
          data: userFound,
        });
      } else {
        res.status(404).json({
          result: "mistake",
          message: "User not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        result: "mistake",
        message: "An error occurred while reading the user",
        data: error.message || error,
      });
    }
  },

  readAllUsers: async (req, res) => {
    try {
      const allUsersFound = await modelUsers.find();
      res.json({
        result: "All fine",
        message: "All users found",
        data: allUsersFound,
      });
    } catch (error) {
      res.status(500).json({
        result: "mistake",
        message: "An error occurred while reading all users",
        data: error.message || error,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userUpdated = await modelUsers.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (userUpdated) {
        res.json({
          result: "All Fine",
          message: "User info has been updated",
          data: userUpdated._id,
        });
      } else {
        res.status(404).json({
          result: "mistake",
          message: "User not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        result: "mistake",
        message: "An error occurred while updating the user info",
        data: error.message || error,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await modelUsers.findByIdAndDelete(req.params.id);
      if (deletedUser) {
        res.json({
          result: "All Fine",
          message: "User has been deleted",
          data: null,
        });
      } else {
        res.status(404).json({
          result: "mistake",
          message: "User not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        result: "mistake",
        message: "An error occurred while deleting the user",
        data: error.message || error,
      });
    }
  },
};

// FUNCIÓN PARA GENERAR CONTRASEÑAS ALEATORIAS
function generateRandomPassword() {
  return crypto.randomBytes(6).toString("hex");
}

// CONTROLADOR PARA RECUPERAR CONTRASEÑA
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await modelUsers.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Email address was not found in Database",
      });
    }

    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NODE,
        pass: process.env.PASS_NODE,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_NODE,
      to: email,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.name},\n\nTu nueva contraseña es: ${newPassword}\n\nPor favor cámbiala luego de iniciar sesión por seguridad.\n\nSaludos,\nEquipo de soporte.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "A new password has been sent to the registered email",
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

export default controllerUsers;