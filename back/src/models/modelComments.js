import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Comentario = mongoose.model("Comentario", commentSchema);
export default Comentario;
