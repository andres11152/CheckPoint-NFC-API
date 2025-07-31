// src/server.ts

// Carga las variables de entorno del archivo .env
import 'dotenv/config';
// Necesario para TypeORM y la inyección de dependencias
import 'reflect-metadata';

// Importaciones necesarias
import express, { Application } from 'express';
import cors from 'cors';
import { AppDataSource } from './infrastructure/config/data-source.js';

// Importa tus NUEVOS archivos de rutas
import AuthRoutes from './infrastructure/api/routes/AuthRoutes.js';
import StudentRoutes from './infrastructure/api/routes/StudentRoutes.js';
import AttendanceRoutes from './infrastructure/api/routes/AttendanceRoutes.js';

/**
 * Función principal que arranca la aplicación.
 */
async function bootstrap() {
  try {
    // 1. Inicializa la conexión a la base de datos
    await AppDataSource.initialize();
    console.log('✅ Base de datos conectada correctamente.');

    const app: Application = express();
    const port = process.env.PORT || 3000;

    // 2. Configuración de Middlewares
    const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://mediumpurple-pigeon-582740.hostingersite.com']
  : ['http://localhost:3000', 'http://localhost:5173'];

    app.use(cors({
      origin: allowedOrigins,
      credentials: true
    }));

 // Habilita CORS para permitir peticiones desde el frontend
    app.use(express.json()); // Permite que Express procese cuerpos de petición en formato JSON

    // 3. Registrar las rutas de la API
    // La inyección de dependencias ya se maneja dentro de cada archivo de rutas.
    app.use('/api', AuthRoutes);       // ej: /api/login
    app.use('/api', StudentRoutes);    // ej: /api/students, /api/students/import
    app.use('/api', AttendanceRoutes); // ej: /api/attendance, /api/attendance/history

    // 4. Iniciar el servidor
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ Error durante el arranque de la aplicación:', error);
    process.exit(1);
  }
}

// Ejecutar la función de arranque
bootstrap();