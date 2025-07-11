import bcrypt from "bcryptjs";
import modelUsers from "../models/modelUsers.js";

const controllerLogin = {
  userLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await modelUsers.findOne({ username });

      if (!user) {
        return res.status(404).json({
          result: "mistake",
          message: "User not found",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          result: "mistake",
          message: "Incorrect password",
        });
      }

      res.status(200).json({
        result: "fine",
        message: "Login successful",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        result: "mistake",
        message: "Error during login",
        data: error.message,
      });
    }
  },
};

export default controllerLogin;
