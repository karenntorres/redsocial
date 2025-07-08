import {Router} from 'express';
import controllerUsers from '../controllers/controllerUsers.js';

const routerUsers = Router();

routerUsers.post('/',controllerUsers.createUser);
routerUsers.get('/:id', controllerUsers.readUser);
routerUsers.get('/', controllerUsers.readAllUsers);
routerUsers.put('/:id', controllerUsers.updateUser);
routerUsers.delete('/:id',controllerUsers.deleteUser);


export default routerUsers; 

