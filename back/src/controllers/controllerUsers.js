import bcrypt from "bcryptjs";
import modelUsers from "../models/modelUsers.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { imagesStorage } from "../middlewares/uploadImages.js";

const controllerUsers = {
  createUser: async (sol, res) => {
    try {
      imagesStorage(sol, res, async (error) => {
        if (error) {
          return res.json({
            result: "mistake",
            message: "An error occurred while uploading the image",
            data: error.message || error,
          });
        }

        try {
          const { name, email, password, username } = sol.body;

          // Encriptar contraseña
          const passwordEncrypted = await bcrypt.hash(password, 10);

          const newUser = new modelUsers({
            name,
            email,
            password: passwordEncrypted,
            username,
            pfPicture: sol.file?.filename || null,
          });

          const createdUser = await newUser.save();

          if (createdUser?._id) {
            return res.json({
              result: "All Fine",
              message: "User has been created",
              data: createdUser._id,
            });
          } else {
            return res.json({
              result: "mistake",
              message: "User could not be created",
              data: null,
            });
          }
        } catch (innerError) {
          return res.json({
            result: "mistake",
            message: "An error occurred while creating the user",
            data: innerError.message || innerError,
          });
        }
      });
    } catch (outerError) {
      res.json({
        result: "mistake",
        message: "Unexpected error occurred",
        data: outerError.message || outerError,
      });
    }
  },

  readUser: async (sol, res) => {
    try {
      const userFound = await modelUsers.findById(sol.params.id);
      if (userFound?._id) {
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
      res.json({
        result: "mistake",
        message: "An error occurred while reading the user",
        data: error.message || error,
      });
    }
  },

  readAllUsers: async (sol, res) => {
    try {
      const allUsersFound = await modelUsers.find();
      res.json({
        result: "All fine",
        message: "All users found",
        data: allUsersFound,
      });
    } catch (error) {
      res.json({
        result: "mistake",
        message: "An error occurred while reading all users",
        data: error.message || error,
      });
    }
  },

  updateUser: async (sol, res) => {
    try {
      const userUpdated = await modelUsers.findByIdAndUpdate(
        sol.params.id,
        sol.body,
        { new: true }
      );
      if (userUpdated?._id) {
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
      res.json({
        result: "mistake",
        message: "An error occurred while updating the user info",
        data: error.message || error,
      });
    }
  },

  deleteUser: async (sol, res) => {
    try {
      const deletedUser = await modelUsers.findByIdAndDelete(sol.params.id);
      if (deletedUser?._id) {
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
      res.json({
        result: "mistake",
        message: "An error occurred while deleting the user",
        data: error.message || error,
      });
    }
  },
};

// Función para generar contraseña aleatoria
function generateRandomPassword() {
  return crypto.randomBytes(6).toString("hex");
}

// Recuperación de contraseña
export const forgotPassword = async (sol, res) => {
  try {
    const { email } = sol.body;
    const user = await modelUsers.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email address was not found in Database" });
    }

    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    // Servicio de correo
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
      text: `Hola ${user.name},\n\nTu nueva contraseña es: ${newPassword}\n\nPor favor cámbiala después de iniciar sesión por seguridad.\n\nSaludos, Soporte`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "A new password has been sent to the registered email",
    });
  } catch (error) {
    console.error("Error al recuperar contraseña:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

export default controllerUsers;