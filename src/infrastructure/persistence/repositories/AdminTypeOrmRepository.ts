import { DataSource, Repository } from 'typeorm';
import { Admin } from '../../../domain/entities/Admin.js';
import { AdminRepositoryPort } from '../../../domain/ports/out/AdminRepositoryPort.js';
import { AdminSchema } from '../entities/AdminSchema.js';

export class AdminTypeOrmRepository implements AdminRepositoryPort {
  private repository: Repository<Admin>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(AdminSchema);
  }

  /**
   * Mapeador para convertir un objeto simple de la base de datos
   * en una instancia de la clase de dominio `Admin`.
   */
  private toDomain(plainAdmin: Admin | null): Admin | null {
    if (!plainAdmin) {
      return null;
    }
    return new Admin(
      plainAdmin.id,
      plainAdmin.username,
      plainAdmin.password
    );
  }

  async findByUsername(username: string): Promise<Admin | null> {
    const plainAdmin = await this.repository.findOne({ where: { username } });
    return this.toDomain(plainAdmin); // Se retorna una instancia de la clase
  }

  async save(admin: Admin): Promise<Admin> {
    const savedAdmin = await this.repository.save(admin);
    return this.toDomain(savedAdmin)!; // Se retorna una instancia de la clase
  }
}