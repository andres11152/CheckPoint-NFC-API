// src/application/useCases/AuthUseCases.ts (o la ruta que sea)

import { AdminRepositoryPort } from '../ports/out/AdminRepositoryPort';
import { AuthServicePort } from '../ports/in/AuthServicePort';
import { Admin } from '../entities/Admin';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
// AJUSTE: Cambiado 'bcryptjs' por 'bcrypt' si es lo que estás usando
// o importación correcta si estás usando 'bcryptjs'
// import * as bcrypt from 'bcryptjs';
import bcrypt from 'bcryptjs'; // Esta es la importación correcta para bcryptjs
import { Request } from 'express';
import crypto from 'crypto';


export class AuthUseCases implements AuthServicePort {
  constructor(private readonly adminRepository: AdminRepositoryPort) {}

  async login(username: string, password: string): Promise<string> {
    const admin = await this.adminRepository.findByUsername(username);
    if (!admin) {
        throw new Error('Usuario no encontrado');
    }

    // AJUSTE: Llamada a la función `compare` directamente desde el módulo bcryptjs
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
        throw new Error('Contraseña incorrecta');
    }

    const secret = process.env.JWT_SECRET;

    // Con esta estructura, el error es imposible que ocurra.
    if (secret) {
      const payload = {
        id: String(admin.id), // Convierte a String para asegurar
        username: String(admin.username) // Convierte a String para asegurar
      };

      const token = sign(
          payload,
          secret,
          { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );
      return token;
    } else {
      throw new Error('JWT_SECRET no está definido');
    }
  }

  verifyToken(token: string): any {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET no está definido');
    // AJUSTE #3: Llama a 'verify' directamente
    return verify(token, secret);
  }

  // ... el resto de tu clase no necesita cambios ...
  getUserFromRequest(req: Request): any {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) throw new Error('Token no proporcionado');

    const token = authHeader.split(' ')[1];
    return this.verifyToken(token);
  }

 async register(adminData: { username: string; password: string }): Promise<Admin> {
    // La función hash() de bcryptjs toma la contraseña y el número de saltRounds
    // Esto asegura que la contraseña se hashee de forma segura.
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const id = crypto.randomUUID();
    
    // Crea una nueva instancia de Admin con el hash de la contraseña
    const newAdmin = new Admin(id, adminData.username, hashedPassword);
    
    // Guarda el nuevo usuario en el repositorio (base de datos)
    return await this.adminRepository.save(newAdmin);
  }
}
