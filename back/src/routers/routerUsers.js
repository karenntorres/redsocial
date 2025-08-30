import { Router } from 'express';
import controllerUsers, {
	forgotPassword,
} from '../controllers/controllerUsers.js';
import upload from '../middlewares/uploadImages.js'; // 👈 updated import

const routerUsers = Router();

// User routes
routerUsers.post('/', upload.single('pfPicture'), controllerUsers.createUser);
routerUsers.get('/:id', controllerUsers.readUser);
routerUsers.get('/', controllerUsers.readAllUsers);
routerUsers.put('/:id', controllerUsers.updateUser);
routerUsers.delete('/:id', controllerUsers.deleteUser);

// Password recovery
routerUsers.post('/forgot-password', forgotPassword);

export default routerUsers;
