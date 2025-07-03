import express from "express"; 
import morgan from "morgan"; 
import cors from "cors";

const servidor = express();
servidor.use(morgan('dev'));
servidor.use(express.json());
servidor.use(cors());



servidor.get('/', (sol,res)=>{
    res.status(404).send('Not found');
});

export default servidor; 