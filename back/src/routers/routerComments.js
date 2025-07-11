import { Router } from 'express';
import controllerComments from '../controllers/controllerComments.js';

const routerComments = Router();

// Crear comentario
routerComments.post("/", controllerComments.crearComentario);

// Obtener todos los comentarios
routerComments.get("/", controllerComments.obtenerTodosLosComentarios);

// Eliminar comentario
routerComments.delete("/:id", controllerComments.eliminarComentario);

export default routerComments;
