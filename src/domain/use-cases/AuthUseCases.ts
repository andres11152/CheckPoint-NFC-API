import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Admin } from '../entities/Admin';
import { AuthServicePort, LoginCredentialsDto } from '../ports/in/AuthServicePort';
import { AdminRepositoryPort } from '../ports/out/AdminRepositoryPort';

export class AuthUseCases implements AuthServicePort {
  
  // El caso de uso depende del puerto del repositorio, que se inyecta.
  constructor(private readonly adminRepository: AdminRepositoryPort) {}

  /**
   * Procesa el login de un administrador.
   */
  async login(credentials: LoginCredentialsDto): Promise<{ token: string } | null> {
    // 1. Buscar al administrador por su nombre de usuario.
    const admin = await this.adminRepository.findByUsername(credentials.username);
    if (!admin) {
      return null; // Usuario no encontrado.
    }

    // 2. Comparar la contraseña enviada con el hash guardado en la base de datos.
    const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
    if (!isPasswordValid) {
      return null; // Contraseña incorrecta.
    }

    // 3. Si las credenciales son válidas, generar un JSON Web Token (JWT).
    const payload = { id: admin.id, username: admin.username };
    const secret = process.env.JWT_SECRET || 'una-clave-secreta-por-defecto-muy-segura';
    
    const token = jwt.sign(payload, secret, {
      expiresIn: '8h', // El token expirará en 8 horas.
    });

    return { token };
  }

  /**
   * (Método extra) Registra un nuevo administrador. 
   * Útil para un script de configuración inicial.
   */
  async registerAdmin(credentials: LoginCredentialsDto): Promise<Admin> {
      // Hashear la contraseña antes de guardarla.
      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      const adminId = uuidv4();

      const newAdmin = new Admin(adminId, credentials.username, hashedPassword);
      
      return this.adminRepository.save(newAdmin);
  }
}