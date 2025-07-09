import { Router } from 'express';
import controllerComments from "../controllers/controllerComments.js";


const routerComments = Router();

// Crear un nuevo comentario
routerComments.post("/", controllerComments.crearComentario);

// Obtener todos los comentarios de un post
routerComments.get("/:postId", controllerComments.obtenerComentariosPorPost);

// Eliminar un comentario por su ID
routerComments.delete("/:id", controllerComments.eliminarComentario);

export default routerComments;
