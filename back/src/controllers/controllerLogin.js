import bcrypt from "bcryptjs";
import modelUsers from "../models/modelUsers.js";

const controllerLogin = {
  // Función para iniciar sesión
  userLogin: async (req, res) => {
    try {
      // Obtenemos el email y la contraseña del cuerpo de la petición
      const { email, password } = req.body;

      // Verificamos si ambos campos fueron enviados
      if (email === "" || password === "") {
        return res.status(400).json({
          result: "mistake",
          message: "You must fill in both email and password",
        });
      }

      // Buscamos en la base de datos si existe un usuario con ese email (en minúsculas)
      const user = await modelUsers.findOne({ email: email.toLowerCase() });

      // Si no existe el usuario, devolvemos error
      if (!user) {
        return res.status(404).json({
          result: "mistake",
          message: "User not found",
        });
      }

      // Comparamos la contraseña que envió el usuario con la que está en la base de datos
      const passwordMatch = await bcrypt.compare(password, user.password);

      // Si las contraseñas no coinciden, devolvemos error
      if (!passwordMatch) {
        return res.status(401).json({
          result: "mistake",
          message: "Incorrect password",
        });
      }

      // Si todo está bien, enviamos la respuesta con los datos del usuario (excepto la contraseña)
      res.status(200).json({
        result: "fine",
        message: "Login successful",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          pfPicture: user.pfPicture,
        },
      });
    } catch (error) {
      // Si algo sale mal, devolvemos error del servidor
      res.status(500).json({
        result: "mistake",
        message: "Error during login",
        data: error.message,
      });
    }
  },
};

export default controllerLogin; 
