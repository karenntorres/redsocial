import { Router } from "express";
import controllerLogin from "../controllers/controllerLogin.js";

const routerLogin = Router();

routerLogin.post("/", controllerLogin.userLogin);

export default routerLogin;
