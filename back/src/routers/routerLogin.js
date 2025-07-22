import { Router } from 'express';
import controllerLogin from '../controllers/controllerLogin.js';

const routerLogin = Router();

routerLogin.post('/', controllerLogin.userLogin);
routerLogin.get('/token/:token', controllerLogin.validateToken);

export default routerLogin;
