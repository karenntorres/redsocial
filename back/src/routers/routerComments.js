import { Router } from 'express';
import {
    crearComentario,
    obtenerComentariosPorPost,
    eliminarComentario
} from '../controllers/controllerComments.js';

const routerComments = Router();

routerComments.post('/', crearComentario);
routerComments.get('/:postId', obtenerComentariosPorPost);
routerComments.delete('/:id', eliminarComentario);

export default routerComments;  