import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  }
});

const Comentario = mongoose.model("Comentario", commentSchema);
export default Comentario;
