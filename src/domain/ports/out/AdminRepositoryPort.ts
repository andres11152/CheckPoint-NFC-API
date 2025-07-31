import { Admin } from '../../entities/Admin';

export interface AdminRepositoryPort {
  /**
   * Busca un administrador por su nombre de usuario.
   * @param username - El nombre de usuario a buscar.
   * @returns La entidad Admin o null si no se encuentra.
   */
  findByUsername(username: string): Promise<Admin | null>;
  
  /**
   * Guarda un nuevo administrador. (Útil para un script de setup inicial).
   * @param admin - La entidad de administrador a guardar.
   * @returns La entidad guardada.
   */
  save(admin: Admin): Promise<Admin>;
}