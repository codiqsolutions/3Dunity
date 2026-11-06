import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/3dunity',
  jwtSecret: process.env.JWT_SECRET || '3dunity_super_secure_jwt_secret_dev_key_2026_x89f',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5175',
  maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB || '50', 10),
  uploadDir: path.resolve(__dirname, '../../uploads'),
};

