import { Admin } from '../../entities/Admin.js';

// DTO para las credenciales de login.
export type LoginCredentialsDto = {
  username: string;
  password: string;
}

export interface AuthServicePort {
  /**
   * Autentica a un administrador y retorna un token de sesión (JWT).
   * @param credentials - El usuario y contraseña.
   * @returns Un objeto con el token o null si las credenciales son inválidas.
   */
  login(credentials: LoginCredentialsDto): Promise<{ token: string } | null>;
}