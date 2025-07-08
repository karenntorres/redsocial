import { Router } from "express";
import controllerLogin from "../controllers/controllerLogin.js";

const routerLogin = Router();

routerLogin.post("/", controllerLogin.iniciarSesion);

export default routerLogin;
