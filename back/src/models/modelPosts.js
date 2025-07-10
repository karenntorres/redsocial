import { Schema, model } from 'mongoose';

const esquemaPost = new Schema({
  contenido: { type: String, required: true },
  imagen: { type: String, required: false }
}, {
  versionKey: false,
  timestamps: true
});

export default model('posts', esquemaPost);

