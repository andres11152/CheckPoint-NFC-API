// Carga las variables de entorno del archivo .env
import 'dotenv/config';
// Necesario para TypeORM y la inyección de dependencias
import 'reflect-metadata';

// Importaciones necesarias
import express, { Application } from 'express';
import cors from 'cors';
import { AppDataSource } from './infrastructure/config/data-source.js';

// Importa tus archivos de rutas
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

    // --- CONFIGURACIÓN DE CORS MEJORADA ---
    const allowedOrigins = [
      'http://localhost:3000', 
      'http://localhost:5173',
      // Asegúrate que esta es la URL correcta de tu frontend en producción
      'https://mediumpurple-pigeon-582740.hostingersite.com'
    ];

    const corsOptions: cors.CorsOptions = {
      origin: (origin, callback) => {
        // En producción, es más seguro no permitir 'undefined' a menos que sea necesario.
        // Aquí, permitimos si el origen está en nuestra lista blanca O si es undefined
        // (lo cual es útil para peticiones server-to-server o Postman en desarrollo).
        if (!origin || allowedOrigins.includes(origin)) {
          // Logueamos para tener un registro de las peticiones permitidas
          console.log(`CORS: Petición permitida desde el origen: ${origin}`);
          callback(null, true);
        } else {
          // Bloqueamos cualquier otro origen no autorizado
          console.error(`CORS: Petición bloqueada desde el origen: ${origin}`);
          callback(new Error('No permitido por CORS'));
        }
      },
      credentials: true
    };

    app.use(cors(corsOptions));
    app.use(express.json());

    // 3. Registrar las rutas de la API
    app.use('/api/auth', AuthRoutes);       // ej: /api/auth/login
    app.use('/api/students', StudentRoutes);     // ej: /api/students/
    app.use('/api/attendance', AttendanceRoutes); // ej: /api/attendance/

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
