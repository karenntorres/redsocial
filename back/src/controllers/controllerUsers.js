import bcrypt from 'bcryptjs';
import modelUsers from '../models/modelUsers.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { registrarLog } from '../ayudas/logger.js'; //

const controllerUsers = {
	createUser: async (req, res) => {
		try {
			const { name, email, password, username } = req.body;
			const pfPicture = req.file ? req.file.filename : null;

			if (!pfPicture) {
				registrarLog(
					'Intento fallido de crear usuario: falta foto de perfil'
				);
				return res.status(400).json({
					result: 'mistake',
					message: 'Profile picture is required',
					data: null,
				});
			}

			const passwordEncrypted = await bcrypt.hash(password, 10);

			const newUser = new modelUsers({
				name,
				email,
				password: passwordEncrypted,
				username,
				pfPicture,
			});

			const createdUser = await newUser.save();

			registrarLog(
				`Usuario creado: ${JSON.stringify({ name, email, username })}`
			);

			res.json({
				result: 'All Fine',
				message: 'User has been created',
				data: createdUser._id,
			});
		} catch (error) {
			registrarLog(
				`Error creando usuario: ${error.message} ${error.stack} `
			);
			res.status(500).json({
				result: 'mistake',
				message: 'An error occurred while creating the user',
				data: error.message || error,
			});
		}
	},

	readUser: async (req, res) => {
		try {
			const userFound = await modelUsers.findById(req.params.id);
			if (userFound) {
				registrarLog(`Usuario consultado: ${req.params.id}`);
				res.json({
					result: 'All Fine',
					message: 'User has been found',
					data: userFound,
				});
			} else {
				registrarLog(
					`Consulta fallida: usuario no encontrado (${req.params.id})`
				);
				res.status(404).json({
					result: 'mistake',
					message: 'User not found',
					data: null,
				});
			}
		} catch (error) {
			registrarLog(
				`Error leyendo usuario ${req.params.id}: ${error.message}`
			);
			res.status(500).json({
				result: 'mistake',
				message: 'An error occurred while reading the user',
				data: error.message || error,
			});
		}
	},

	readAllUsers: async (req, res) => {
		try {
			const allUsersFound = await modelUsers.find();
			registrarLog('Consulta de todos los usuarios');
			res.json({
				result: 'All fine',
				message: 'All users found',
				data: allUsersFound,
			});
		} catch (error) {
			registrarLog(`Error leyendo todos los usuarios: ${error.message}`);
			res.status(500).json({
				result: 'mistake',
				message: 'An error occurred while reading all users',
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
				registrarLog(`Usuario actualizado: ${req.params.id}`);
				res.json({
					result: 'All Fine',
					message: 'User info has been updated',
					data: userUpdated._id,
				});
			} else {
				registrarLog(
					`Intento fallido de actualizar usuario: ${req.params.id} no encontrado`
				);
				res.status(404).json({
					result: 'mistake',
					message: 'User not found',
					data: null,
				});
			}
		} catch (error) {
			registrarLog(
				`Error actualizando usuario ${req.params.id}: ${error.message}`
			);
			res.status(500).json({
				result: 'mistake',
				message: 'An error occurred while updating the user info',
				data: error.message || error,
			});
		}
	},

	deleteUser: async (req, res) => {
		try {
			const deletedUser = await modelUsers.findByIdAndDelete(
				req.params.id
			);
			if (deletedUser) {
				registrarLog(`Usuario eliminado: ${req.params.id}`);
				res.json({
					result: 'All Fine',
					message: 'User has been deleted',
					data: null,
				});
			} else {
				registrarLog(
					`Intento fallido de eliminar usuario: ${req.params.id} no encontrado`
				);
				res.status(404).json({
					result: 'mistake',
					message: 'User not found',
					data: null,
				});
			}
		} catch (error) {
			registrarLog(
				`Error eliminando usuario ${req.params.id}: ${error.message}`
			);
			res.status(500).json({
				result: 'mistake',
				message: 'An error occurred while deleting the user',
				data: error.message || error,
			});
		}
	},
};

function generateRandomPassword() {
	return crypto.randomBytes(6).toString('hex');
}

export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await modelUsers.findOne({ email });

		if (!user) {
			registrarLog(`Intento fallido de recuperación: ${email} no existe`);
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

		registrarLog(`Contraseña reestablecida para: ${email}`);

		res.status(200).json({
			message: 'A new password has been sent to the registered email',
		});
	} catch (error) {
		registrarLog(`Error en recuperación de contraseña: ${error.message}`);
		res.status(500).json({
			message: 'Internal server error',
			error: error.message || error,
		});
	}
};

export default controllerUsers;
