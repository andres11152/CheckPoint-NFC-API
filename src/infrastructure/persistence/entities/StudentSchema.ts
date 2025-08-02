// src/infrastructure/persistence/entities/StudentSchema.ts
import { EntitySchema } from 'typeorm';
import { Student } from '../../../domain/entities/Student';

export const StudentSchema = new EntitySchema<Student>({
  name: 'Student',
  tableName: 'students',
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
      name: 'last_name', // ← opcional si tu columna es snake_case
    },
    nfcId: {
      type: 'varchar',
      unique: true,
      name: 'nfc_id', // ← necesario si en tu BD está como "nfc_id"
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
      name: 'created_at',
    },
  },
});
