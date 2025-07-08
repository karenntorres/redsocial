import express from "express"; 
import morgan from "morgan"; 
import cors from "cors";
import routerPost from "./routers/routerPost.js";

const servidor = express();
servidor.use(morgan('dev'));
servidor.use(express.json());
servidor.use(cors());
servidor.use('/posts', routerPost);



servidor.get('/', (sol,res)=>{
    res.status(404).send('Not found');
});

export default servidor;  