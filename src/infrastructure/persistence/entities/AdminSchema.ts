import { EntitySchema } from 'typeorm';
import { Admin } from '../../../domain/entities/Admin.js';

export const AdminSchema = new EntitySchema<Admin>({
  name: 'Admin',
  tableName: 'admins',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    username: {
      type: 'varchar',
      unique: true, // No puede haber dos administradores con el mismo username
    },
    password: {
      type: 'varchar', // La columna almacenará el hash de la contraseña
    },
  },
});