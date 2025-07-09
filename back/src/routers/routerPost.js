import { Router } from 'express';
import controllerPosts from '../controllers/controllerPosts.js';
import { uploadSingleImage } from '../middlewares/upload.js';

const routerPosts = Router();

routerPosts.post('/', uploadSingleImage, controllerPosts.crearPost);       // Crear post (con imagen)
routerPosts.get('/', controllerPosts.listarPosts);       // Listar todos los posts
routerPosts.get('/:id', controllerPosts.verPost);        // Ver un post por ID
routerPosts.delete('/:id', controllerPosts.eliminarPost); // Eliminar un post

export default routerPosts;