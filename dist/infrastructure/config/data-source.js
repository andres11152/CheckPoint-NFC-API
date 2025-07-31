"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/infrastructure/config/data-source.ts
require("reflect-metadata");
const typeorm_1 = require("typeorm");
// Importa los esquemas de tus entidades
const AdminSchema_1 = require("../persistence/entities/AdminSchema");
const StudentSchema_1 = require("../persistence/entities/StudentSchema");
const AttendanceSchema_1 = require("../persistence/entities/AttendanceSchema");
// Configuración para la conexión a PostgreSQL con TypeORM
exports.AppDataSource = new typeorm_1.DataSource({
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
        AdminSchema_1.AdminSchema,
        StudentSchema_1.StudentSchema,
        AttendanceSchema_1.AttendanceSchema,
    ],
    migrations: [],
    subscribers: [],
});
