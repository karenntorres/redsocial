import fs from 'fs';
import path from 'path';

const logPath = path.join(process.cwd(), 'bitacora.log');

export function registrarLog(mensaje) {
	const entrada = `[${new Date().toISOString()}] ${mensaje}\n`;
	fs.appendFileSync(logPath, entrada);
}
