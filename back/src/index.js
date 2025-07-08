import "dotenv/config";
import "./conexion.js";

import servidor from "./servidor.js";

const PORT = 3001;
servidor.listen(PORT, () => {
	console.log(`The server is listening at http://localhost:${PORT}`);
});