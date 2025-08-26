const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');
const User = require('../src/models/modelUsers');

jest.setTimeout(10000); // Aumenta el timeout para conexiones lentas

beforeAll(async () => {
  const mongoURI = 'mongodb+srv://proyectoredsocial2025:proyectoredsocial2025@cluster0.w0rqnvi.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0';
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany(); // Limpia la colección antes de los tests
});

afterAll(async () => {
  await mongoose.connection.close(); // Cierra la conexión para que Jest termine
});

describe('Pruebas de integración de usuarios', () => {
  it('Debe responder con lista de usuarios', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});