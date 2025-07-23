// External imports
import { Router } from 'express';

// Internal controllers
import controllerUsers, { forgotPassword } from '../controllers/controllerUsers.js';
import { imagesStorage } from '../middlewares/uploadImages.js';

const routerUsers = Router();

// 👤 User routes
routerUsers.post('/', controllerUsers.createUser);
routerUsers.get('/:id', controllerUsers.readUser);
routerUsers.get('/', controllerUsers.readAllUsers);
routerUsers.put('/:id', controllerUsers.updateUser);
routerUsers.delete('/:id', controllerUsers.deleteUser);

// Password recovery
routerUsers.post('/forgot-password', forgotPassword);

export default routerUsers;
