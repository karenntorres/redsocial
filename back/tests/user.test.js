import request from 'supertest';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import servidor from '../src/servidor.js';
import '../src/conexion.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let createdUserId;

describe('Pruebas de integración de usuarios', () => {
	beforeAll(async () => {
		const res = await request(servidor)
			.post('/users')
			.field('name', 'Test User')
			.field('email', 'test@example.com')
			.field('password', '123456')
			.field('username', 'tester')
			.attach('pfPicture', join(__dirname, 'files/Nutriapaloma.png'));

		createdUserId = res.body.data;
	});

	it('Debe responder con lista de usuarios', async () => {
		const res = await request(servidor).get('/users');
		expect(res.statusCode).toBe(200);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Debe crear un nuevo usuario', async () => {
		const res = await request(servidor)
			.post('/users')
			.field('name', 'Another User')
			.field('email', 'another@example.com')
			.field('password', 'password456')
			.field('username', 'anotheruser123')
			.attach('pfPicture', join(__dirname, 'files/Nutriapaloma.png'));

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('data');
		expect(res.body.result).toBe('All Fine');
	});

	it('Debe obtener un usuario por su ID', async () => {
		const res = await request(servidor).get(`/users/${createdUserId}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.data).toHaveProperty('email', 'test@example.com');
	});

	it('Debe permitir login con credenciales correctas', async () => {
		const res = await request(servidor).post('/loginUser/').send({
			email: 'test@example.com',
			password: '123456',
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('data.token');
		expect(res.body.result).toBe('fine');
	});

	it('Debe rechazar login con contraseña incorrecta', async () => {
		const res = await request(servidor).post('/loginUser/').send({
			email: 'test@example.com',
			password: 'wrongpassword',
		});

		expect(res.statusCode).toBe(401);
		expect(res.body.message).toBe('Incorrect password');
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
