import bcrypt from "bcryptjs"; // se usa para encriptar la constraseña
import modelUsers from "../models/modelUsers.js"; // conexion con user's model
import crypto from "crypto";
import nodemailer from "nodemailer"; // para enviar correos de forma masiva, desde el back
import { imagesStorage } from "../middlewares/uploadImages.js";

const controllerUsers = {
  createUser: async (sol, res) => {
    try {
      imagesStorage(sol, res, async (error) => {
        if (error) {
          res.json({
            result: "mistake",
            message: "An error occurred while updloading the image",
            data: null,
          });
        } if(imagesStorage){
            const {password} = sol.body; //plane text
            const passwordEncrypted = await bcrypt.hash(password, 10);
            const newProfileImageandPassword = new modelUsers({
                name:sol.body.name,
                email: sol.body.email,
                password: passwordEncrypted,
                username: sol.body.username,
                pfPicture: sol.file.filename,
            });
        }       
      });

      const createdUser = await newProfileImageandPassword.save();
      if (createdUser._id) {
        res.json({
          result: "All Fine",
          message: "User has been created",
          data: createdUser._id,
        });
      }
    } catch (error) {
      res.json({
        result: "mistake",
        message: "An error occured while creating the user",
        data: error,
      });
    }
  },

  readUser: async (sol, res) => {
    try {
      const userFound = await modelUsers.findById(sol.params.id);
      if (userFound._id) {
        res.json({
          result: "All Fine",
          message: "User has been found",
          data: userFound,
        });
      }
    } catch (error) {
      res.json({
        result: "mistake",
        message: "An error occurred while reading the user",
        data: error,
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
        message: "An error occurred while reading all Users",
        data: error,
      });
    }
  },

  updateUser: async (sol, res) => {
    try {

      const userUpdated = await modelUsers.findByIdAndUpdate(
        sol.params.id,
        sol.body
      );
      if (userUpdated._id) {
        res.json({
          result: "All Fine",
          message: "User info has been updated",
          data: userUpdated._id,
        });
      }
    } catch (error) {
      res.json({
        result: "mistake",
        message: "An error occurred while updating the user info",
        data: error,
      });
    } 
  },

  deleteUser: async (sol, res) => {
    try {
      const deletedUser = await modelUsers.findByIdAndDelete(sol.params.id);
      if (deletedUser._id) {
        res.json({
          result: "All Fine",
          message: "User has been deleted",
          data: null,
        });
      }
    } catch (error) {
      res.json({
        result: "mistake",
        message: "An error ocurred while deleting the user",
        data: error,
      });
    }
  },
};

//PARA CREACIÓN DE CONTRASEÑAS ALEATOREAS:

function generateRandomPassword() {
  return crypto.randomBytes(6).toString("hex");
}

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

    // Configuración de servicio de correo:
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NODE,
        pass: process.env.PASS_NODE,
      },
    });

    // email content

    const mailOptions = {
      from: "proyectoredsocial2025@gmail.com",
      to: email,
      subject: "Recuperación de contraseña",
      text: `Hola ${user.name}, \n\ Tu nueva contraseña es: ${newPassword} \n\ Recuerda actualizar tu contraseña en tu perfil por seguridad. \n\ Saludos desde el area de soporte.`,
    };

    // envío del correo

    await transporter.sendMail(mailOptions);

    // To answer:

    res
      .status(200)
      .json({
        message: "A new password has been sent to the registered email",
      });
  } catch (error) {
    console.error("Error by resetting the password", error),
      res
        .status(500)
        .json({
          message: "Internal error in the server",
          error: error.message,
        });
  }
};

export default controllerUsers;
