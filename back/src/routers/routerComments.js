import { Router } from 'express';
import controllerComments from "../controllers/controllerComments.js";

const routerComments = Router();

routerComments.post("/", controllerComments.crearComentario);
routerComments.get("/:postId", controllerComments.obtenerComentariosPorPost);
routerComments.delete("/:id", controllerComments.eliminarComentario);

export default routerComments;
