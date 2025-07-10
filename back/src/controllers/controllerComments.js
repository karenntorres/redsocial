import Comentario from '../models/modelComments.js';

const controllerComments = {
  // Crear comentario
  crearComentario: async (req, res) => {
    try {
      const { contenido, postId, usuario } = req.body;

      if (!contenido || !postId) {
        return res.status(400).json({
          result: 'mistake',
          message: 'El contenido y el postId son obligatorios',
          data: null,
        });
      }

      const nuevoComentario = new Comentario({ contenido, postId, usuario });
      const comentarioGuardado = await nuevoComentario.save();

      res.status(201).json({
        result: 'fine',
        message: 'Comentario creado',
        data: comentarioGuardado,
      });
    } catch (error) {
      res.status(500).json({
        result: 'mistake',
        message: 'Error al crear el comentario',
        data: error.message,
      });
    }
  },

  // Obtener comentarios por postId
  obtenerComentariosPorPost: async (req, res) => {
    try {
      const { postId } = req.params;
      const comentarios = await Comentario.find({ postId }).sort({ createdAt: -1 });

      res.json({
        result: 'fine',
        message: 'Comentarios encontrados',
        data: comentarios,
      });
    } catch (error) {
      res.status(500).json({
        result: 'mistake',
        message: 'Error al obtener comentarios',
        data: error.message,
      });
    }
  },

  // Obtener todos los comentarios
  obtenerTodosLosComentarios: async (req, res) => {
    try {
      const comentarios = await Comentario.find().sort({ createdAt: -1 });

      res.json({
        result: 'fine',
        message: 'Todos los comentarios',
        data: comentarios,
      });
    } catch (error) {
      res.status(500).json({
        result: 'mistake',
        message: 'Error al obtener todos los comentarios',
        data: error.message,
      });
    }
  },

  // Eliminar comentario
  eliminarComentario: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Comentario.findByIdAndDelete(id);

      if (!eliminado) {
        return res.status(404).json({
          result: 'mistake',
          message: 'Comentario no encontrado',
          data: null,
        });
      }

      res.json({
        result: 'fine',
        message: 'Comentario eliminado',
        data: eliminado._id,
      });
    } catch (error) {
      res.status(500).json({
        result: 'mistake',
        message: 'Error al eliminar el comentario',
        data: error.message,
      });
    }
  },
};

export default controllerComments;