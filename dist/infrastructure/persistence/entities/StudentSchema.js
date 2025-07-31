"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSchema = void 0;
// src/infrastructure/persistence/entities/StudentSchema.ts
const typeorm_1 = require("typeorm");
exports.StudentSchema = new typeorm_1.EntitySchema({
    name: 'Student', // El nombre de la clase de dominio
    tableName: 'students', // El nombre de la tabla en la base de datos
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        name: {
            type: 'varchar',
        },
        lastName: {
            type: 'varchar',
        },
        nfcId: {
            type: 'varchar',
            unique: true, // El nfcId debe ser único
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
        },
    },
});
