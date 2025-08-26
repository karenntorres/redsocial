require('dotenv').config();
const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log('✅ Connected to database');
  } catch (error) {
    console.log('❌ ERROR, Not connected to database');
    console.error('🔍 Detalles:', error.message);
  }
};

module.exports = conectarDB;