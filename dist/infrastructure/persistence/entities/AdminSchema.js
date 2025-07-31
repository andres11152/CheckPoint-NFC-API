"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSchema = void 0;
const typeorm_1 = require("typeorm");
exports.AdminSchema = new typeorm_1.EntitySchema({
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
