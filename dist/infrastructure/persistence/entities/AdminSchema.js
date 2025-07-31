import { EntitySchema } from 'typeorm';
export const AdminSchema = new EntitySchema({
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
