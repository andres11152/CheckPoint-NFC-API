import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Admin } from '../entities/Admin.js';
import { AuthServicePort, LoginCredentialsDto } from '../ports/in/AuthServicePort.js';
import { AdminRepositoryPort } from '../ports/out/AdminRepositoryPort.js';

export class AuthUseCases implements AuthServicePort {
  
  constructor(private readonly adminRepository: AdminRepositoryPort) {}

  async login(credentials: LoginCredentialsDto): Promise<{ token: string } | null> {
    
    // --- INICIO DE LOGS DE DEPURACIÓN ---
    console.log('--- Iniciando proceso de login ---');
    console.log(`1. Intentando autenticar al usuario: "${credentials.username}"`);

    const admin = await this.adminRepository.findByUsername(credentials.username);
    
    if (!admin) {
      console.log('2. Resultado de la búsqueda: Usuario NO encontrado en la base de datos.');
      console.log('--- Fin del proceso de login ---');
      return null; // Usuario no encontrado.
    }

    console.log(`2. Resultado de la búsqueda: Usuario encontrado. ID: ${admin.id}`);
    console.log(`3. Hash de la contraseña guardado en la BD: "${admin.password}"`);

    const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
    
    console.log(`4. Resultado de bcrypt.compare: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      console.log('5. Conclusión: La contraseña es INCORRECTA.');
      console.log('--- Fin del proceso de login ---');
      return null; // Contraseña incorrecta.
    }

    console.log('5. Conclusión: ¡La contraseña es CORRECTA!');
    
    const payload = { id: admin.id, username: admin.username };
    const secret = process.env.JWT_SECRET || 'una-clave-secreta-por-defecto-muy-segura';
    
    const token = jwt.sign(payload, secret, {
      expiresIn: '8h',
    });

    console.log('6. Token JWT generado exitosamente.');
    console.log('--- Fin del proceso de login ---');

    return { token };
  }

  async registerAdmin(credentials: LoginCredentialsDto): Promise<Admin> {
      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      const adminId = uuidv4();
      const newAdmin = new Admin(adminId, credentials.username, hashedPassword);
      return this.adminRepository.save(newAdmin);
  }
}
