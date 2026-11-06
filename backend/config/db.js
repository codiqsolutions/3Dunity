// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.warn(
      '\n⚠️  MONGODB_URI is not set or still has placeholder values in backend/.env'
    );
    console.warn(
      '   The server will start, but all database operations will fail.'
    );
    console.warn(
      '   Edit backend/.env → replace <username> and <password> with your real MongoDB Atlas credentials.\n'
    );
    return; // Don't crash — let Express still serve requests
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error(
      '   Check your MONGODB_URI in backend/.env — make sure the credentials are correct\n'
    );
    // Don't call process.exit so Express keeps running during development
  }
};

module.exports = connectDB;
