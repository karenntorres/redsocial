import modelPosts from '../models/modelPosts.js';
import multer from 'multer';

// Configurar almacenamiento para imagen
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const nombreFinal = Date.now() + '-' + file.originalname;
    cb(null, nombreFinal);
  }
});
const upload = multer({ storage }).single('imagen');

const controllerPosts = {
  // Crear publicación con imagen
  crearPost: async (req, res) => {
    upload(req, res, async (error) => {
      if (error) {
        return res.json({
          result: 'mistake',
          message: 'Error al subir la imagen',
          data: null,
        });
      }

      try {
        const nuevaPublicacion = new modelPosts({
          usuario: req.body.usuario,
          contenido: req.body.contenido,
          imagen: req.file ? req.file.filename : null,
        });

        const postGuardado = await nuevaPublicacion.save();
        res.json({
          result: 'fine',
          message: 'Publicación creada',
          data: postGuardado._id,
        });
      } catch (err) {
        res.json({
          result: 'mistake',
          message: 'Error al crear la publicación',
          data: err,
        });
      }
    });
  },

  // Obtener todas las publicaciones
  listarPosts: async (req, res) => {
    try {
      const posts = await modelPosts.find().sort({ createdAt: -1 });
      res.json({
        result: 'fine',
        message: 'Publicaciones encontradas',
        data: posts,
      });
    } catch (err) {
      res.json({
        result: 'mistake',
        message: 'Error al leer todas las publicaciones',
        data: err,
      });
    }
  },

  // Ver una publicación por ID
  verPost: async (req, res) => {
    try {
      const post = await modelPosts.findById(req.params.id);
      if (post) {
        res.json({
          result: 'fine',
          message: 'Publicación encontrada',
          data: post,
        });
      }
    } catch (err) {
      res.json({
        result: 'mistake',
        message: 'Error al leer la publicación',
        data: err,
      });
    }
  },

  // Eliminar publicación
  eliminarPost: async (req, res) => {
    try {
      const eliminado = await modelPosts.findByIdAndDelete(req.params.id);
      if (eliminado) {
        res.json({
          result: 'fine',
          message: 'Publicación eliminada',
          data: null,
        });
      }
    } catch (err) {
      res.json({
        result: 'mistake',
        message: 'Error al eliminar la publicación',
        data: err,
      });
    }
  },
};

export default controllerPosts;
