"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTypeOrmRepository = void 0;
const Admin_1 = require("../../../domain/entities/Admin");
const AdminSchema_1 = require("../entities/AdminSchema");
class AdminTypeOrmRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository(AdminSchema_1.AdminSchema);
    }
    /**
     * Mapeador para convertir un objeto simple de la base de datos
     * en una instancia de la clase de dominio `Admin`.
     */
    toDomain(plainAdmin) {
        if (!plainAdmin) {
            return null;
        }
        return new Admin_1.Admin(plainAdmin.id, plainAdmin.username, plainAdmin.password);
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const plainAdmin = yield this.repository.findOne({ where: { username } });
            return this.toDomain(plainAdmin); // Se retorna una instancia de la clase
        });
    }
    save(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedAdmin = yield this.repository.save(admin);
            return this.toDomain(savedAdmin); // Se retorna una instancia de la clase
        });
    }
}
exports.AdminTypeOrmRepository = AdminTypeOrmRepository;
