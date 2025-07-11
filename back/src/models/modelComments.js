import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  contenido: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,     
  timestamps: true      
});

export default model("comentarios", commentSchema); // nombre de la colección
