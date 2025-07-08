import { Router } from 'express';
import {
  crearComentario,
  obtenerComentariosPorPost,
  eliminarComentario
} from '../controllers/controllerComments.js';

const router = Router();

router.post('/', crearComentario);
router.get('/:postId', obtenerComentariosPorPost);
router.delete('/:id', eliminarComentario);

export default router;