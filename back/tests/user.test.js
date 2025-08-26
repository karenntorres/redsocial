const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');

describe('Pruebas de integración de usuarios', () => {
  it('Debe responder con lista de usuarios', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 10000); // timeout extendido
});

// Cierra la conexión a MongoDB después de las pruebas
afterAll(async () => {
  await mongoose.connection.close();
});