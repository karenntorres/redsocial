import { Router } from 'express';
import controllerUsers, {
	forgotPassword,
} from '../controllers/controllerUsers.js';
import upload from '../middlewares/uploadImages.js';

const routerUsers = Router();

routerUsers.post('/', upload.single('pfPicture'), controllerUsers.createUser);
routerUsers.get('/:id', controllerUsers.readUser);
routerUsers.get('/', controllerUsers.readAllUsers);
routerUsers.put('/:id', upload.single('pfPicture'), controllerUsers.updateUser);
routerUsers.delete('/:id', controllerUsers.deleteUser);

routerUsers.post('/forgot-password', forgotPassword);

export default routerUsers;
