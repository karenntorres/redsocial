import modelPosts from '../models/modelPosts.js';
import fs from 'fs';
import path from 'path';

const controllerPosts = {
  // Crear publicación (sin usuario)
  crearPost: async (req, res) => {
    try {
      const nuevaPublicacion = new modelPosts({
        contenido: req.body.contenido,
        imagen: req.file?.filename || null,
      });

      const postGuardado = await nuevaPublicacion.save();

      res.json({
        result: 'fine',
        message: 'Publicación creada',
        data: postGuardado._id,
      });
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'Error al crear la publicación',
        data: error,
      });
    }
  },

  // Listar todas las publicaciones
  listarPosts: async (req, res) => {
    try {
      const posts = await modelPosts.find().sort({ createdAt: -1 });
      res.json({
        result: 'fine',
        message: 'Publicaciones encontradas',
        data: posts,
      });
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'Error al leer publicaciones',
        data: error,
      });
    }
  },

  // Ver publicación por ID
  verPost: async (req, res) => {
    try {
      const post = await modelPosts.findById(req.params.id);
      if (post) {
        res.json({
          result: 'fine',
          message: 'Publicación encontrada',
          data: post,
        });
      } else {
        res.status(404).json({
          result: 'mistake',
          message: 'Publicación no encontrada',
          data: null,
        });
      }
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'Error al buscar la publicación',
        data: error,
      });
    }
  },

  // Eliminar publicación
  eliminarPost: async (req, res) => {
    try {
      const eliminado = await modelPosts.findByIdAndDelete(req.params.id);

      if (eliminado) {
        // Elimina la imagen si existe
        const ruta = path.join('imagenes', eliminado.imagen);
        if (fs.existsSync(ruta)) {
          fs.unlinkSync(ruta);
        }

        res.json({
          result: 'fine',
          message: 'Publicación eliminada',
          data: eliminado._id,
        });
      } else {
        res.status(404).json({
          result: 'mistake',
          message: 'Publicación no encontrada',
          data: null,
        });
      }
    } catch (error) {
      res.json({
        result: 'mistake',
        message: 'Error al eliminar la publicación',
        data: error,
      });
    }
  },
};

export default controllerPosts;
