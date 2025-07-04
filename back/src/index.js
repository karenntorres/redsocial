import "dotenv/config";
import "./conexion.js";

import servidor from "./servidor.js";

servidor.listen(3000, () => {
	console.log("The server is listening the link http://localhost:3000");
});

//comentario de prueba
