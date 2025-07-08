import Comentario from '../models/modelComments.js';

export const crearComentario = async (req, res) => {
  try {
    const { postId, autor, contenido } = req.body;
    const nuevo = await Comentario.create({ postId, autor, contenido });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el comentario', error });
  }
};

export const obtenerComentariosPorPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comentarios = await Comentario.find({ postId });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener comentarios', error });
  }
};

export const eliminarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Comentario.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    res.json({ mensaje: 'Comentario eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar comentario', error });
  }
};