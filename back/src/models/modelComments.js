import { Schema, model } from 'mongoose';

const esquemaComentario = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'posts', required: true },
  autor: { type: String, required: true },
  contenido: { type: String, required: true } //el texto del comentario
}, {
  versionKey: false,
  timestamps: true
});

export default model('comentarios', esquemaComentario);