import express from "express"; 
import morgan from "morgan"; 
import cors from "cors";
import routerPost from "./routers/routerPost.js";
import routerComentarios from "./routers/routerComments.js";

const servidor = express();
servidor.use(morgan('dev'));
servidor.use(express.json());
servidor.use(cors());

// Rutas
servidor.use('/posts', routerPost);
servidor.use('/comentarios', routerComentarios);

// Ruta por defecto
servidor.get('/', (sol, res) => {
    res.status(404).send('Not found');
});

export default servidor;

