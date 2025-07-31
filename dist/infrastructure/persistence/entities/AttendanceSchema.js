"use strict";
// src/infrastructure/persistence/entities/AttendanceSchema.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceSchema = void 0;
const typeorm_1 = require("typeorm");
const Attendance_1 = require("../../../domain/entities/Attendance");
exports.AttendanceSchema = new typeorm_1.EntitySchema({
    name: 'Attendance',
    tableName: 'attendances',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        // 'studentId' se elimina de aquí. TypeORM lo creará automáticamente.
        timestamp: {
            type: 'timestamp with time zone',
        },
        type: {
            type: 'enum',
            enum: Attendance_1.AttendanceType,
        },
    },
    relations: {
        // Esto ahora es válido porque la clase Attendance SÍ tiene una propiedad 'student'
        student: {
            type: 'many-to-one',
            target: 'Student', // Apunta al nombre de la clase/esquema del Estudiante
            joinColumn: {
                name: 'student_id', // Así se llamará la columna de la clave foránea
            },
            onDelete: 'CASCADE',
        },
    },
});
