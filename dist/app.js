"use strict";
// src/server.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Carga las variables de entorno del archivo .env
require("dotenv/config");
// Necesario para TypeORM y la inyección de dependencias
require("reflect-metadata");
// Importaciones necesarias
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./infrastructure/config/data-source");
// Importa tus NUEVOS archivos de rutas
const AuthRoutes_1 = __importDefault(require("./infrastructure/api/routes/AuthRoutes"));
const StudentRoutes_1 = __importDefault(require("./infrastructure/api/routes/StudentRoutes"));
const AttendanceRoutes_1 = __importDefault(require("./infrastructure/api/routes/AttendanceRoutes"));
/**
 * Función principal que arranca la aplicación.
 */
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 1. Inicializa la conexión a la base de datos
            yield data_source_1.AppDataSource.initialize();
            console.log('✅ Base de datos conectada correctamente.');
            const app = (0, express_1.default)();
            const port = process.env.PORT || 3000;
            // 2. Configuración de Middlewares
            const allowedOrigins = process.env.NODE_ENV === 'production'
                ? ['https://mediumpurple-pigeon-582740.hostingersite.com']
                : ['http://localhost:3000', 'http://localhost:5173'];
            app.use((0, cors_1.default)({
                origin: allowedOrigins,
                credentials: true
            }));
            // Habilita CORS para permitir peticiones desde el frontend
            app.use(express_1.default.json()); // Permite que Express procese cuerpos de petición en formato JSON
            // 3. Registrar las rutas de la API
            // La inyección de dependencias ya se maneja dentro de cada archivo de rutas.
            app.use('/api', AuthRoutes_1.default); // ej: /api/login
            app.use('/api', StudentRoutes_1.default); // ej: /api/students, /api/students/import
            app.use('/api', AttendanceRoutes_1.default); // ej: /api/attendance, /api/attendance/history
            // 4. Iniciar el servidor
            app.listen(port, () => {
                console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error('❌ Error durante el arranque de la aplicación:', error);
            process.exit(1);
        }
    });
}
// Ejecutar la función de arranque
bootstrap();
