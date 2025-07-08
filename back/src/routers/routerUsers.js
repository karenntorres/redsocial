import { Router } from 'express';
import controllerUsers, { forgotPassword } from '../controllers/controllerUsers.js';

const routerUsers = Router();

// Crear nuevo usuario con imagen y contraseña encriptada
routerUsers.post('/', controllerUsers.createUser);

// Obtener un usuario por ID
routerUsers.get('/:id', controllerUsers.readUser);

// Obtener todos los usuarios
routerUsers.get('/', controllerUsers.readAllUsers);

// Actualizar info de un usuario
routerUsers.put('/:id', controllerUsers.updateUser);

// Eliminar usuario por ID
routerUsers.delete('/:id', controllerUsers.deleteUser);

// Recuperación de contraseña
routerUsers.post('/forgot-password', forgotPassword);

export default routerUsers