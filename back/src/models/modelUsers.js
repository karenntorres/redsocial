import { Schema, model } from 'mongoose';

const schemaUser = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true, // evita duplicado en el email
			trim: true,
			lowercase: true,
			match: [
				/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
				'Invalid email format',
			],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true,
			trim: true,
		},
		pfPicture: {
			type: String,
			required: [true, 'Profile picture is required'],
		},
	},
	{
		timestamps: true, // agrega createdAt y updatedAt automáticamente
	}
);

export default model('user', schemaUser);
