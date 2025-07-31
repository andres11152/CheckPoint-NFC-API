import { Admin } from '../../../domain/entities/Admin.js';
import { AdminSchema } from '../entities/AdminSchema.js';
export class AdminTypeOrmRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository(AdminSchema);
    }
    /**
     * Mapeador para convertir un objeto simple de la base de datos
     * en una instancia de la clase de dominio `Admin`.
     */
    toDomain(plainAdmin) {
        if (!plainAdmin) {
            return null;
        }
        return new Admin(plainAdmin.id, plainAdmin.username, plainAdmin.password);
    }
    async findByUsername(username) {
        const plainAdmin = await this.repository.findOne({ where: { username } });
        return this.toDomain(plainAdmin); // Se retorna una instancia de la clase
    }
    async save(admin) {
        const savedAdmin = await this.repository.save(admin);
        return this.toDomain(savedAdmin); // Se retorna una instancia de la clase
    }
}
