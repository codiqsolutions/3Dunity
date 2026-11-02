import mongoose from 'mongoose';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { config } from './env';

const LOCAL_MONGOD_PATH = '/home/vasu/.cache/mongodb-binaries/mongod-x64-ubuntu-6.0.14';
const LOCAL_DB_DIR = path.resolve(__dirname, '../../data/db');

async function ensureLocalMongoDaemon(): Promise<void> {
  if (!fs.existsSync(LOCAL_MONGOD_PATH)) {
    return;
  }

  if (!fs.existsSync(LOCAL_DB_DIR)) {
    fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
  }

  // Spawn mongod if not already running on port 27017
  try {
    const net = await import('net');
    const isPortOpen = await new Promise<boolean>((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(1000);
      socket.on('connect', () => {
        socket.destroy();
        resolve(true);
      });
      socket.on('timeout', () => {
        socket.destroy();
        resolve(false);
      });
      socket.on('error', () => {
        resolve(false);
      });
      socket.connect(27017, '127.0.0.1');
    });

    if (!isPortOpen) {
      console.log('🔄 Launching local MongoDB daemon from cached binary...');
      const proc = spawn(
        LOCAL_MONGOD_PATH,
        ['--dbpath', LOCAL_DB_DIR, '--port', '27017', '--bind_ip', '127.0.0.1'],
        {
          detached: true,
          stdio: 'ignore',
        }
      );
      proc.unref();

      // Give it 2.5 seconds to initialize
      await new Promise((resolve) => setTimeout(resolve, 2500));
      console.log('✅ Local MongoDB daemon ready on 127.0.0.1:27017');
    }
  } catch (err) {
    console.warn('Note: Could not auto-spawn local mongod:', err);
  }
}

export async function connectDB(): Promise<void> {
  try {
    await ensureLocalMongoDaemon();

    await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected successfully to: ${config.mongodbUri}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    // Don't kill process immediately; allow retry or fallback in dev
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected.');
});

