// src/infrastructure/config/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';

// Importa los esquemas de tus entidades
import { AdminSchema } from '../persistence/entities/AdminSchema';
import { StudentSchema } from '../persistence/entities/StudentSchema';
import { AttendanceSchema } from '../persistence/entities/AttendanceSchema';

// Configuración para la conexión a PostgreSQL con TypeORM
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'your_db_user',
    password: process.env.DB_PASSWORD || 'your_db_password',
    database: process.env.DB_NAME || 'nfc_assistance_db', // <-- Nombre de BD actualizado

    // ----- AJUSTE CLAVE PARA DESARROLLO -----
    // Para el MVP, es más rápido tenerlo en 'true' para que TypeORM
    // cree y actualice las tablas automáticamente cada vez que inicies la app.
    // Recuerda ponerlo en 'false' para producción.
    synchronize: false,
    
    logging: true, // Ponlo en 'true' para ver las consultas SQL en la consola

    // Aquí se registran todas las entidades que TypeORM debe manejar
    entities: [
        AdminSchema,
        StudentSchema,
        AttendanceSchema,
    ],
    
    migrations: [],
    subscribers: [],
});