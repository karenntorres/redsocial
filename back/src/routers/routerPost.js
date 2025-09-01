import { Router } from 'express';
import controllerPosts from '../controllers/controllerPosts.js';
import { uploadSingleImage } from '../middlewares/upload.js';

const routerPosts = Router();

routerPosts.post('/', uploadSingleImage, controllerPosts.crearPost);
routerPosts.get('/', controllerPosts.listarPosts);
routerPosts.get('/:id', controllerPosts.verPost);
routerPosts.delete('/:id', controllerPosts.eliminarPost);

export default routerPosts;
