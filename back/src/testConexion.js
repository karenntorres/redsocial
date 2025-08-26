require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB)
  .then(() => console.log('✅ Conexión exitosa'))
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
    console.error('🔍 Detalles completas:', err);
  });