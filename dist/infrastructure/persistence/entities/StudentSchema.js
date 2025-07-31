// src/infrastructure/persistence/entities/StudentSchema.ts
import { EntitySchema } from 'typeorm';
export const StudentSchema = new EntitySchema({
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
