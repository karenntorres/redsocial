import bcrypt from "bcryptjs";
import modelUsers from "../models/modelUsers.js";

const controllerLogin = {
	userLogin: async (sol, res) => {
		try {
			const { username, password } = sol.body;

			const userFound = await modelUsers.findOne({ username });

			if (!userFound) {
				return res.json({
					result: "Mistake",
					message: "User not found",
					data: null,
				});
			}

			const contrasenaValidada = await bcrypt.compare(
				password,
				userFound.password
			);

			if (contrasenaValidada) {
				res.json({
					result: "Fine",
					message: "Access granted",
					data: {
						id: userFound._id,
						name: userFound.name,
						email: userFound.email,
					},
				});
			} else {
				res.json({
					result: "Mistake",
					message: "Incorrect password",
					data: null,
				});
			}
		} catch (error) {
			res.json({
				result: "Mistake",
				message: "An error occurred during login",
				data: error,
			});
		}
	},
};

export default controllerLogin;
