// Script temporal para crear un usuario administrador
// NOTA: Asegúrate de que las rutas de importación sean correctas para tu proyecto
// Para ejecutar: `ts-node create-admin.ts` o `node --loader ts-node/esm create-admin.ts`

import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from './src/infrastructure/config/data-source.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
// CORRECCIÓN: Importamos AdminSchema en lugar de Admin
import { AdminSchema } from './src/infrastructure/persistence/entities/AdminSchema.js';
import { Repository } from 'typeorm';

async function createAdminUser() {
  try {
    // Inicializa la conexión a la base de datos
    await AppDataSource.initialize();
    console.log('✅ Base de datos conectada.');

    // CORRECCIÓN: Obtenemos el repositorio de AdminSchema, no de Admin
    const adminRepository: Repository<any> = AppDataSource.getRepository(AdminSchema);

    // Datos del nuevo usuario
    const username = 'admin';
    const plainPassword = 'admin123'; // Contraseña en texto plano

    // Hashea la contraseña con 10 saltRounds, como en tu código
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const id = crypto.randomUUID();

    // CORRECCIÓN: Creamos un objeto que coincida con la estructura de AdminSchema
    const newAdmin = {
      id: id,
      username: username,
      password: hashedPassword
    };

    // Guarda el usuario en la base de datos
    await adminRepository.save(newAdmin);

    console.log('🎉 Usuario "admin" creado con éxito.');
    console.log(`- ID: ${id}`);
    console.log(`- Username: ${username}`);
    console.log(`- Hash de contraseña: ${hashedPassword}`);

  } catch (error) {
    console.error('❌ Error al crear el usuario administrador:', error);
    process.exit(1);
  } finally {
    // Cierra la conexión de la base de datos
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('🔌 Conexión a la base de datos cerrada.');
    }
  }
}

// Ejecuta la función
createAdminUser();
