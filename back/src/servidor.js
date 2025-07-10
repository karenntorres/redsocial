import express from "express"; 
import morgan from "morgan"; 
import cors from "cors";
import routerUsers from "./routers/routerUsers.js";
import routerPost from "./routers/routerPost.js";
import routerComments from "./routers/routerComments.js";
import routerLogin from "./routers/routerLogin.js"

const servidor = express();
servidor.use(morgan('dev'));
servidor.use(express.json());
servidor.use(cors());

// Rutas
servidor.use('/posts', routerPost);
servidor.use('/comments', routerComments);
servidor.use('/users', routerUsers);
servidor.use("/loginUser", routerLogin);

// Ruta por defecto
servidor.get('/', (sol, res) => {
    res.status(404).send('Not found');
});

export default servidor;
