import { Schema, model } from 'mongoose';

const esquemaPost = new Schema(
	{
		contenido: { type: String, required: true },
		imagen: { type: String, required: false },
		usuario: { type: Schema.Types.ObjectId, ref: 'users', required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('posts', esquemaPost);
