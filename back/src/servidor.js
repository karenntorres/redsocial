import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import routerUsers from './routers/routerUsers.js';
import routerPost from './routers/routerPost.js';
import routerComments from './routers/routerComments.js';
import routerLogin from './routers/routerLogin.js';

const servidor = express();

// Middlewares globales
servidor.use(morgan('dev'));
servidor.use(cors());
servidor.use(express.json({ limit: '10mb' }));
servidor.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas agrupadas bajo /api para consistencia RESTful
servidor.use('/api/users', routerUsers);
servidor.use('/api/posts', routerPost);
servidor.use('/api/comments', routerComments);
servidor.use('/api/login', routerLogin);

// Ruta raíz para verificación rápida
servidor.get('/', (req, res) => {
  res.status(200).send('Servidor activo 🚀');
});

// Ruta catch-all para 404
servidor.use((req, res) => {
  res.status(404).json({
    result: 'mistake',
    message: 'Ruta no encontrada',
    path: req.originalUrl,
  });
});

export default servidor;