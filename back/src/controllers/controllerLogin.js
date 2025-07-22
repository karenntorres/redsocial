import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from '../ayudas/funciones.js';
import modelUsers from '../models/modelUsers.js';

const controllerLogin = {
	userLogin: async (req, res) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({
					result: 'mistake',
					message: 'You must fill in both email and password',
				});
			}

			const user = await modelUsers.findOne({
				email: email.toLowerCase(),
			});

			if (!user) {
				return res.status(404).json({
					result: 'mistake',
					message: 'User not found',
				});
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return res.status(401).json({
					result: 'mistake',
					message: 'Incorrect password',
				});
			}

			const token = await generateToken({
				id: user._id,
				name: user.name,
				rol: user.rol,
			});

			res.status(200).json({
				result: 'fine',
				message: 'Login successful',
				data: {
					token,
					user: {
						id: user._id,
						name: user.name,
						email: user.email,
						username: user.username,
						pfPicture: user.pfPicture,
					},
				},
			});
		} catch (error) {
			res.status(500).json({
				result: 'mistake',
				message: 'Error during login',
				data: error.message,
			});
		}
	},

	validateToken: async (req, res) => {
		try {
			const token = req.params.token;
			const decoded = await verifyToken(token);

			if (decoded && decoded.id) {
				res.status(200).json({
					result: 'fine',
					message: 'Token valid',
					data: decoded,
				});
			} else {
				res.status(401).json({
					result: 'mistake',
					message: 'Token invalid',
					data: null,
				});
			}
		} catch (error) {
			res.status(500).json({
				result: 'mistake',
				message: 'Error while verifying token',
				data: error.message,
			});
		}
	},
};

export default controllerLogin;
