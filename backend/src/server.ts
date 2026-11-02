import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config/env';
import { connectDB } from './config/db';
import { seedDatabase } from './utils/seedData';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import customRequestRoutes from './routes/customRequestRoutes';
import authRoutes from './routes/authRoutes';
import reviewRoutes from './routes/reviewRoutes';
import serviceRoutes from './routes/serviceRoutes';
import galleryRoutes from './routes/galleryRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import cartRoutes from './routes/cartRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app = express();

// Middlewares
app.use(
  cors({
    origin: [config.clientUrl, 'http://localhost:5175', 'http://127.0.0.1:5175'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(config.uploadDir));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: '3Dunity API Gateway',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/custom-requests', customRequestRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/uploads', uploadRoutes);

// 404 Route handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use(errorHandler);

// Bootstrap Server & DB
async function bootstrap() {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(config.port, () => {
      console.log(`
🚀 3Dunity API Server running in ${config.nodeEnv} mode
📡 Local URL: http://localhost:${config.port}
📂 Static Uploads: http://localhost:${config.port}/uploads
🩺 Health Check: http://localhost:${config.port}/api/health
      `);
    });
  } catch (err) {
    console.error('Failed to start 3Dunity backend server:', err);
    process.exit(1);
  }
}

bootstrap();

export default app;

