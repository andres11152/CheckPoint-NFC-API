// src/infrastructure/persistence/entities/AttendanceSchema.ts

import { EntitySchema } from 'typeorm';
import { Attendance, AttendanceType } from '../../../domain/entities/Attendance';

// El import de Student ya no es estrictamente necesario aquí, pero es buena práctica mantenerlo
import { Student } from '../../../domain/entities/Student'; 

export const AttendanceSchema = new EntitySchema<Attendance>({
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
      enum: AttendanceType,
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